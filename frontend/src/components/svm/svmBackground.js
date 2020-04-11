import React from 'react';
import {Header, Image} from 'semantic-ui-react';
import { InlineMath, BlockMath } from 'react-katex';

export const SVMBackground = _ => {
    return (
        <div className='svm__background'>
            <Header size='huge'>
                Background
            </Header>
            <p>
                The support vector machine is a supervised linear classifier 
                used to seperate data into two classes. Say our data is of the
                form:
            </p>
            <BlockMath math='\{ (\textbf{x}_1, y_1), \ \dots \ , (\textbf{x}_n, y_n) \}' />
            <p>
                where <InlineMath math='\textbf{x}_i' /> is a <InlineMath math='n' />-dimensional
                vector and <InlineMath math='y_i \in \{-1, 1\}' /> is the class label. 
            </p>
            <p>
                The data here is seperated by a <InlineMath math='n' />-dimensional
                hyperplane of the form: 
            </p>
            <BlockMath math='\textbf{w}^{T}\textbf{x} - b = 0' />
            <p>
                where <InlineMath math='\textbf{w}' /> and <InlineMath math='\textbf{x}' /> are <InlineMath math='n' />-dimensional 
                vectors. We define two additional hyperplanes that serve as a margin between the two classes:
            </p>
            <Image  src='https://upload.wikimedia.org/wikipedia/commons/7/72/SVM_margin.png'
                    size='medium'
                    className='svm-image'
            />
            <p>
                where points on or above the
                hyperplane <InlineMath math='\textbf{w}^{T}\textbf{x} - b = 1' /> are
                classified with label <InlineMath math='y_i = 1' /> and points on or below the
                hyperplane <InlineMath math='\textbf{w}^{T}\textbf{x} - b = -1' /> are
                classified with label <InlineMath math='y_i = -1' />.
            </p>
            <p>
                The vectors that lie on the marginal boundaries are called support vectors.
                As described in the picture, the distance between the two marginal hyperplanes
                is <InlineMath math='\frac{2}{|| \textbf{w} ||}' />. We want to maximize this distance
                by minimizing <InlineMath math='||\textbf{w}||' />. Since we want the points to be 
                above/below the respective hyperplanes, we need to enforce the following constraints:
            </p>
            <BlockMath math='\begin{cases}
                \textbf{w}^{T}\textbf{x}_i - b \geq 1 & \text{if } y_i = 1 \\
                \textbf{w}^{T}\textbf{x}_i - b \leq -1 & \text{if } y_i = -1 
            \end{cases}' />
            <p>
                We can then compact these constraints into one constraint:
            </p>
            <BlockMath math='y_i(\textbf{w}^{T}\textbf{x}_i - b) \geq 1' />
            <p>
                The parameters <InlineMath math='\textbf{w}' /> and <InlineMath math='b' /> that
                solve this optimization problem will form our classifier:
            </p>
            <BlockMath math='\mathrm{sgn}(\textbf{w}^{T}\textbf{x} - b)' />
            <p>
                where <InlineMath math='\mathrm{sgn}' /> denotes the sign function.
            </p>
            <p>
                To help train the SVM, we need to have the trained SVM minimize the
                following loss function:
            </p>
            <BlockMath math='\frac{1}{n} \sum_{i=1}^{n} 
                \max(0, 1 - y_i(\textbf{w}^{T}\textbf{x}_i - b))
                + C ||\textbf{w}||^2' 
            />
            <p>
                where the quantity inside the sum is the hinge loss function
                and <InlineMath math='C' /> is a regularizing 
                parameter. <InlineMath math='C' /> determines how strict
                the marginal boundaries are enforced.
            </p>
            <p>
                Getting the optimal parameters are obtained through either
                quadratic programming or numerical methods such as 
                stochastic gradient descent.
            </p>
            <Header size='large'>References:</Header>
            <ul>
                <li>
                    <a 
                        href='https://en.wikipedia.org/wiki/Support-vector_machine' 
                        target="_blank"
                    >
                        Wikipedia
                    </a>
                </li>
            </ul>
        </div>
    );
}