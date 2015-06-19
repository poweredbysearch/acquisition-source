'use strict';

import test from 'tape';
import url from 'url';
import {parseReferrer, parseUtm} from '../parsers';

export default function run () {

    test('Correctly identifies Google PPC referrals', (assert) => {
        assert.deepEqual(
            parseReferrer(url.parse('http://www.google.ca/aclk?sa=l&ai=CvHF1myeEVfu-AofYpgP3z4K4D4eou7UH7')),
            {
                source: 'google',
                medium: 'ppc'
            }
        );

        assert.deepEqual(
            parseReferrer(url.parse('http://www.google.co.uk/aclk?sa=l&ai=CvHF1myeEVfu-AofYpgP3z4K4D4eou7UH7')),
            {
                source: 'google',
                medium: 'ppc'
            }
        );

        assert.deepEqual(
            parseReferrer(url.parse('http://www.googleadservices.com/pagead/aclk?sa=L&ai=CS0zX1uaCVcsXlJmmA8uKgnCW9KbxBq6ipO29AYvFzQUIABADKANg_aCZgegDoAG69c_UA8gBAakCpfqWapuUqz6qBCNP0O62W5afc6Kj8ybEwyMa')),
            {
                source: 'google',
                medium: 'ppc'
            }
        );

        assert.notDeepEqual(
            parseReferrer(url.parse('http://www.googleme.co.uk/aclk?sa=l&ai=CvHF1myeEVfu-AofYpgP3z4K4D4eou7UH7')),
            {
                source: 'google',
                medium: 'ppc'
            }
        );

        assert.end();
    });

}