import React from 'react';
import {Header, Image} from 'semantic-ui-react';
import { InlineMath, BlockMath } from 'react-katex';

export const LDABackground = _ => {
    return (
        <div className='lda__background'>
            <Header size='huge'>
                Background
            </Header>
            <p>
                (LDA background here)
            </p>
        </div>
    );
}