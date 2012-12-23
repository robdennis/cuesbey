'use strict';

/* jasmine specs for services go here */

describe('service', function() {
    beforeEach(module('cubeViewer.services'));

    describe("cardCategoryService", function() {
        var svc, cubeContents;
        cubeContents = modo_cube_og_data;

        beforeEach(inject(function ($injector, CardCategoryService) {
            svc = CardCategoryService;
        }));

        var eliteVanguard = cubeContents['Elite Vanguard'];
        var karn = cubeContents['Karn Liberated'];
        var dynamo = cubeContents['Thran Dynamo'];
        var sculler = cubeContents['Tidehollow Sculler'];

        it('should handle monocolor and negation', function() {

            expect(svc.matchesCategory('!Blue/!Black', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!White', eliteVanguard)).toBe(false);
        });
        it('should handle simple types and negation', function() {

            expect(svc.matchesCategory('Creature', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!Creature', eliteVanguard)).toBe(false);
        });

        it('should handle negation of simple color', function() {

            expect(svc.matchesCategory('!White', eliteVanguard)).toBe(false);
        });
        it('should handle colorless checks', function() {

            expect(svc.matchesCategory('!Colorless', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('Colorless', eliteVanguard)).toBe(false);
            expect(svc.matchesCategory('!Colorless', karn)).toBe(false);
            expect(svc.matchesCategory('Colorless', karn)).toBe(true);
            expect(svc.matchesCategory('!Colorless', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless', dynamo)).toBe(true);
        });

        it('should distinguish between colorless and artifacts', function() {
            expect(svc.matchesCategory('Colorless/Artifact', karn)).toBe(false);
            expect(svc.matchesCategory('Colorless/!Artifact', karn)).toBe(true);
            expect(svc.matchesCategory('Colorless/!Artifact/!Land', karn)).toBe(true);
            expect(svc.matchesCategory('Colorless/Artifact', dynamo)).toBe(true);
            expect(svc.matchesCategory('Colorless/!Artifact', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless/Artifact/!Land', dynamo)).toBe(true);
            expect(svc.matchesCategory('Colorless/Artifact', dynamo)).toBe(true);
            expect(svc.matchesCategory('Artifact', sculler)).toBe(true);
            expect(svc.matchesCategory('Multicolor/Artifact', sculler)).toBe(true);
            expect(svc.matchesCategory('!Colorless/Artifact', sculler)).toBe(true);
        });

        it('should allow intelligent combinations of categories', function() {
            expect(svc.matchesCategory('Colorless', sculler)).toBe(false);
            expect(svc.matchesCategory('Artifact/Colorless', sculler)).toBe(false);
            expect(svc.matchesCategory('Colorless/Artifact/Land', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless/Land/Artifact', dynamo)).toBe(false);
            expect(svc.matchesCategory('Colorless/Artifact', sculler)).toBe(false);
        });
    });
});
