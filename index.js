/**
 * @author Alireza Mirian (mirian@hasintech.com)
 * @since 1.0 (03/27/2017)
 */
const through     = require('through2');
const gutil       = require('gulp-util');
const PluginError = gutil.PluginError;

const flatten = require('./flatten');
const PLUGIN_NAME = 'gulp-flatten-json';

module.exports = function(options) {

    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            // nothing to do
            return callback(null, file);
        }

        if (file.isStream()) {
            // file.contents is a Stream - https://nodejs.org/api/stream.html
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
        }
        else{
            let obj = null;
            try{
                obj = JSON.parse(file.contents);
            }
            catch(e){
                gutil.log('gulp-inline-base64:',
                    gutil.colors.red('not a json file') + gutil.colors.gray(' (' + file.path + ')'));
                return callback(null, file);
            }
            file.contents = Buffer.from(JSON.stringify(flatten(obj)), 'utf8' );
            return callback(null, file);
        }
    });
};