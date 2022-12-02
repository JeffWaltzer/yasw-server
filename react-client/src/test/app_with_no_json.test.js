import {render} from "@testing-library/react";
import App from "../App";

describe('app with no JSON', () => {
    let app;
    let svg_tags;

    beforeEach(() => {
        const {container} = render(<App />);
        svg_tags = container.querySelectorAll("svg");
    });

    it('produces exactly one svg tag', () => {
        expect(svg_tags.length).toEqual(1);
    });

    describe('the svg tag', () => {
        let the_svg_tag;

        beforeEach(() => {
            the_svg_tag = svg_tags[0];
        });

        it('is full height', () => {
            expect(the_svg_tag.getAttribute('height')).toEqual("100%");
        });

        it('is full width', () => {
            expect(the_svg_tag.getAttribute('width')).toEqual("100%");
        });

        it('has the correct viewbox', () => {
            expect(the_svg_tag.getAttribute('viewBox')).toEqual("0 0 1024 1024");
        });
    });
});