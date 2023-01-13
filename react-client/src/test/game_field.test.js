import {render} from "@testing-library/react";
import Gameboard from "../Gameboard";


const two_suns_json = {
    "polygons": [
        {
            "wireframe": [
                {
                    "points": [
                        [512, 532],
                        [526, 526],
                        [532, 512],
                        [526, 498],
                        [512, 492],
                        [498, 498],
                        [492, 512],
                        [498, 526]
                    ],
                    "color": "blue"
                }
            ],
            "score": 1,
            "position": [
                512,
                512
            ]
        },
        {
            "wireframe": [
                {
                    "points": [
                        [712, 732],
                        [726, 726],
                        [732, 712],
                        [726, 698],
                        [712, 692],
                        [698, 698],
                        [692, 712],
                        [698, 726]
                    ],
                    "color": "green"
                }
            ],
            "score": 2,
            "position": [
                712,
                712
            ]
        }
    ],
    "field_size": [
        1024,
        1024
    ]
};

describe('game field', () => {
    let container;
    beforeEach(()=>{
        container = render(<Gameboard gameboard={JSON.stringify(two_suns_json)}/>)
            .container
    })

    it('generates the g tags', () => {
        const g_tags = container.querySelectorAll("g");
        expect(g_tags.length).toEqual(2);
    })

    describe('the rect tag for the background', () => {
        let rect_tags, the_tag;

        beforeEach(() => {
            rect_tags = container.querySelectorAll("rect");
            the_tag= rect_tags[0];
        });

        it('has the correct width',  () => {
            expect(the_tag.getAttribute("width")).toEqual("100%");
        });

        it('has the correct height',  () => {
            expect(the_tag.getAttribute("height")).toEqual("100%");
        });

        it('has the correct style',  () => {
            expect(the_tag.getAttribute("style")).
            toEqual("fill: rgb(0, 0, 0); stroke-width: 0; stroke: rgb(255,0,0);");
        });
    });

    describe('the polygon tags',  () => {
        let polygon_tags;

        beforeEach(() => {
            polygon_tags = container.querySelectorAll("polygon");
        });

        it('are generated',  () => {
            expect(polygon_tags.length).toEqual(2);
        });

        describe("the first polygon", () => {
            let the_points, the_stroke;

            beforeEach(() => {
                the_points = polygon_tags[0].getAttribute('points');
                the_stroke = polygon_tags[0].getAttribute('stroke');
            });

            it ('has the correct points', () => {
                expect(the_points).toEqual("512,532 526,526 532,512 526,498 512,492 498,498 492,512 498,526");
            });

            it ('has the correct stroke color', () => {
                expect(the_stroke).toEqual("blue");
            });
        });

        describe("the second polygon's points", () => {
            let the_points, the_stroke;

            beforeEach(() => {
                the_points = polygon_tags[1].getAttribute('points');
                the_stroke = polygon_tags[1].getAttribute('stroke');
            });

            it ('has the correct list', () => {
                expect(the_points).toEqual("712,732 726,726 732,712 726,698 712,692 698,698 692,712 698,726");
            });

            it ('has the correct stroke color', () => {
                expect(the_stroke).toEqual("green");
            });
        });
    });
})
