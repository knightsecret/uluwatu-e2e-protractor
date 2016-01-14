/**
 * Created by aszegedi on 1/11/16.
 */
describe('Test to print out jasmine version', function() {
    it('prints jasmine version', function() {
        console.log('jasmine-version:' + jasmine.version || (jasmine.getEnv().versionString && jasmine.getEnv().versionString()));
    });
});