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
        var damnation = cubeContents['Damnation'];

        it('should handle monocolor and negation', function() {
            expect(svc.matchesCategory('White', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!Blue/!Black', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!White', eliteVanguard)).toBe(false);
        });
        it('should handle simple types and negation', function() {

            expect(svc.matchesCategory('Creature', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('!Creature', eliteVanguard)).toBe(false);
        });

        it('should handle either/or categories intelligently', function() {
            expect(svc.matchesCategory('Sorcery|Instant', eliteVanguard)).toBe(false);
            expect(svc.matchesCategory('Artifact|Creature|Planeswalker', eliteVanguard)).toBe(true);
            expect(svc.matchesCategory('Colorless/Artifact|Creature|Planeswalker', karn)).toBe(true);
            expect(svc.matchesCategory('Sorcery|Instant', damnation)).toBe(true);
            expect(svc.matchesCategory('!Sorcery|!Black', damnation)).toBe(false);
            // this is an unhelpful category, but a sorcery is not an instant, sooo...
            expect(svc.matchesCategory('!Sorcery|!Instant', damnation)).toBe(true);
            // Black "spells"
            expect(svc.matchesCategory('Black/Sorcery|Instant', damnation)).toBe(true);
            expect(svc.matchesCategory('Sorcery|Instant/Black', damnation)).toBe(true);
            expect(svc.matchesCategory('Blue/Sorcery|Instant', damnation)).toBe(false);
            expect(svc.matchesCategory('Sorcery|Instant/Blue', damnation)).toBe(false);
            expect(svc.matchesCategory('Sorcery|Creature/Black', damnation)).toBe(true);
            expect(svc.matchesCategory('Instant|Creature/Black', damnation)).toBe(false);
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
