import multiparty from 'multiparty';
import knox from 'knox';
import multiknox from 'knox-mpu-alt';
import AWS from 'aws-sdk';
import mkdirp from 'mkdirp';
import sizeOf from 'image-size';

class Upload {
    constructor(req, options) {
        this._req    = req;
        this._opts   = options || {};
        this._target = ['local', 's3', 'cloudinary'];
        this._log    = req.app.system.logger;

        return this;
    }

    handle(cb) {
        const type = this._req.get('Content-Type');

        if(type.indexOf('multipart/form-data') == -1)
            return cb({type: 'NotMultipart'});

        if( ! this._opts.type || this._target.indexOf(this._opts.type) == -1)
            return cb({type: 'NotValidTarget'});

        if( ! this._opts.dir && ! this._opts.uploadDir )
            return cb({type: 'NotValidUploadDir'});

        this[this._opts.type](cb);
    }

    local(cb) {
        const self      = this;
        const uploadDir = self._opts.uploadDir || self._opts.basedir+'/'+self._opts.dir;
        
        mkdirp(uploadDir, () => {
            const form = new multiparty.Form({
                uploadDir: uploadDir,
                maxFilesSize: self._opts.maxFilesSize || 10485760 // 10mb
            });

            form.parse(self._req, (err, fields, files) => {
                const data = [];

                if(files) {
                    files.file.forEach(file => {
                        const dimensions = sizeOf(file.path) || {};
                        
                        data.push({
                            url: file.path,
                            size: file.size,
                            name: file.originalFilename,
                            path: file.path,
                            width: dimensions.width,
                            height: dimensions.height,
                            ext: dimensions.type,
                        });
                    });
                }

                cb(err, fields, data);
            });        
        });
    }

    s3(cb) {
        const bucket  = this._opts.bucket;
        const folder  = this._opts.folder;
        const headers = {'x-amz-acl': 'public-read'};
        const party   = new multiparty.Form();
        const self    = this;
        let aborted = false;
        const fields  = {};

        const client = knox.createClient({
            key: self._opts.account.key,
            secret: self._opts.account.secret,
            bucket: bucket
        });

        party.on('error', () => {
            cb({type: 'StreamError'});
        });

        party.on('field', (name, value) => {
            fields[name] = value;
        });

        party.on('part', part => {
            headers['Content-Type'] = part.headers['content-type'];

            let cbst  = false;
            const multi = new multiknox({
                client: client,
                objectName: folder+'/'+part.filename,
                stream: part,
                headers: headers,
                noDisk: true,
                maxRetries: 0
            },
            (err, body) => {
                self._log.info('body');
                self._log.info(body);

                const data = [];

                if(body) {
                    data.push({
                        url: body.Location,
                        size: body.size,
                        name: part.filename,
                        path: '/'+folder+'/'+part.filename
                    });
                }

                if( ! cbst ) {
                    cbst = true;
                    cb(err, fields, data);
                }
            });

            multi.on('error', err => {
                self._log.info('multiknox error');
                self._log.error(err);
            });
        });

        party.on('close', () => {
            self._log.info('stream close');
        });

        party.on('aborted', () => {
            self._log.info('stream aborted');
            aborted = true;
        });

        party.parse(this._req);
    }

    cloudinary(cb) {
        return cb(true);

        const obj = {files: []};

        try {
            if( php.empty(_cloudinary) ) {
                req.flash('flash', {type: 'danger', message: 'not found cloudinary config'});
                return res.redirect('/admin');
            }

            const party   = new multiparty.Form();
            const cstream = cloudinary.uploader.upload_stream(result => {
                if(result.url) {
                    result.upload_type = 'A'; // Admin upload
                    result.cloud_name  = _cloudinary.cloud_name;

                    obj.files.push({
                        url: result.url
                    });

                    new _schema('cloudinaries').init(req, res, next).post(result, (err, doc) => {
                        if(doc) _log.info('stream saved');
                    });
                }

                res.json(obj);
            });

            party.on('error', () => {
                _log.error('stream error');
                res.end();
            });

            party.on('part', part => {
                const out = new stream.Writable();

                out._write = (chunk, encoding, done) => {
                    cstream.write(chunk); // write to the stream
                    done(); // don't do anything with the data
                };

                part.pipe(out);
            });

            party.on('close', () => {
                _log.info('stream close');
                cstream.end();
            });

            party.on('aborted', () => {
                _log.info('stream aborted');
                res.end();
            });

            party.parse(req);
        }
        catch(e) {
            _log.error(e.stack);
            res.end();
        }
    }

    local2s3(path, targetPath, cb) {
        const bucket  = this._opts.bucket;
        const headers = {'x-amz-acl': 'public-read'};
        const self    = this;

        const client = knox.createClient({
            key: self._opts.account.key,
            secret: self._opts.account.secret,
            bucket: bucket
        });

        client.putFile(path, targetPath, (err, res) => {
            cb(err, res);
        });
    }

    s3delete(file, cb) {
        const bucket  = this._opts.bucket;
        const headers = {'x-amz-acl': 'public-read'};
        const self    = this;

        const client = knox.createClient({
            key: self._opts.account.key,
            secret: self._opts.account.secret,
            bucket: bucket
        });

        client.deleteFile(file, (err, res) => {
            cb(err, res);
        });
    }
}

export default function(app) {
    return Upload;
};
