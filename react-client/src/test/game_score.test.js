import {render} from "@testing-library/react";
import App from "../App";
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

const the_sun_json = {
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
                    "color": "orange"
                }
            ],
            "score": 0,
            "position": [
                512,
                512
            ]
        },
    ],
    "field_size": [
        1024,
        1024
    ]
};

describe('a score', () => {
    let container;
    beforeEach(()=>{
        container = render(<App gameboard={JSON.stringify(two_suns_json)}/>)
            .container
    })

    describe('the text tag for the first score',  () => {
        let text_tags;

        beforeEach(() => {
            text_tags = container.querySelectorAll("text");
        });

        it('are generated',  () => {
            expect(text_tags.length).toEqual(2);
        });

        describe("the text tag", () => {
            let the_text;

            beforeEach(() => {
                the_text = text_tags[0].textContent;
            });

            it ('is correct', () => {
                expect(the_text).toEqual("1");
            });
        });
    });

    describe('the text tag for the second score',  () => {
        let text_tags;

        beforeEach(() => {
            text_tags = container.querySelectorAll("text");
        });

        it('are generated',  () => {
            expect(text_tags.length).toEqual(2);
        });

        describe("the text tag", () => {

            it ("has correct X position", () => {
                const x_position = text_tags[1].getAttribute('x');
                expect(x_position).toEqual("712");
            });

            it ("has correct Y position", () => {
                const y_position = text_tags[1].getAttribute('y');
                expect(y_position).toEqual("732");
            });

            it ('has correct text', () => {
                const the_text = text_tags[1].textContent;
                expect(the_text).toEqual("2");
            });
        });
    });
});

describe('a score of 0', () => {
    let container;
    beforeEach(()=>{
        container = render(<App gameboard={JSON.stringify(the_sun_json)}/>)
            .container
    });

    it('is not shown', () => {
        expect(container.querySelectorAll("text").length).toEqual(0);
    });
});
