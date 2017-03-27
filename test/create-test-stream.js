/**
 * @author Alireza Mirian (mirian@hasintech.com)
 * @since 1.0 (03/27/2017)
 */
const array = require('stream-array');
const File  = require('vinyl');

module.exports = function () {
    return array(Array.prototype.slice.call(arguments).map(ensureString).map(create));

    function create(contents, index) {
        return new File({
            cwd: '/mock-data/',
            base: '/mock-data/test',
            path: '/mock-data/test/file' + (index).toString() + '.js',
            contents: new Buffer(contents),
            stat: {mode: 0o666}
        });
    }


    function ensureString(contents){
        if(typeof contents === 'object'){
            return JSON.stringify(contents);
        }
        return contents;
    }
};