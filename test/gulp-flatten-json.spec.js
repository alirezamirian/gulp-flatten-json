/**
 * @author Alireza Mirian (mirian@hasintech.com)
 * @since 1.0 (03/27/2017)
 */


const assert = require('stream-assert');
const should = require('should');

const gulp = require('gulp');

const createTestStream = require('./create-test-stream');
const gulpFlattenJson = require('../index');

const samples = {
    shallow: {
        a: 1,
        b: 2
    },
    deep: {
        a: 1,
        b: {
            c: {
                d: 2
            }
        }
    },
    invalid: 'asdasd'
};

describe("gulp-flatten-json", function() {

    it('should work', function(done) {
        createTestStream(samples.deep)
            .pipe(gulpFlattenJson())
            .pipe(assert.length(1))
            .pipe(assert.first(function(file){
                JSON.parse(file.contents.toString()).should.eql({
                    "a": 1,
                    "b.c.d": 2
                });
            }))
            .pipe(assert.end(done))
    });
    it('should not change simple one level deep objects', function(done) {
        createTestStream(samples.shallow)
            .pipe(gulpFlattenJson())
            .pipe(assert.length(1))
            .pipe(assert.first(function(file){
                JSON.parse(file.contents.toString()).should.eql({
                    "a": 1,
                    "b": 2
                });
            }))
            .pipe(assert.end(done))
    });
    it('should ignore invalid files', function(done) {
        createTestStream(samples.shallow, samples.invalid)
            .pipe(gulpFlattenJson())
            .pipe(assert.length(2))
            .pipe(assert.end(done));
    });
});