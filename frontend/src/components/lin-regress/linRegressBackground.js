import React from 'react';
import {Header} from 'semantic-ui-react';
import { InlineMath, BlockMath } from 'react-katex';

export const LinRegressBackground = _ => {
    return (
        <div className='lin-regress__background'>
            <Header size='huge'>
                Background
            </Header>
            <p>
                Linear regression is one of the most basic machine learning techniques.
                It is used/taught quite often in statistics. It correlates one explanatory 
                variable with one or more independent variables by fitting a linear
                model to it. This linear model is then able to give insight as to how
                much (or how little) correleation there is between the independent 
                variable(s) and the dependent variable. Below is the model used to 
                perform single variable linear regression:
            </p>
            <BlockMath math='y = \alpha x + \beta'/>
            <p>
                where <InlineMath math='\alpha'/> is the slope of the 
                line, <InlineMath math='x'/> is the independent 
                variable, <InlineMath math='\beta'/> is the intercept of 
                the line, and <InlineMath math='y'/> is the predicted dependent variable.
            </p>
            <p>
                As mentioned above, one could use multiple independent variables. This 
                idea is easily extended upon the 1 variable model as shown below:
            </p>
            <BlockMath math='y = \textbf{w}^{T} \textbf{x}'/>
            <p>
                where <InlineMath math='\textbf{w}'/> is 
                a <InlineMath math='n \times 1'/> vector of 
                coefficients, <InlineMath math='\textbf{x}'/> is 
                a <InlineMath math='n \times 1'/> input vector (with
                the independent variables), and <InlineMath math='y'/> still
                being the predicted dependent variable.
            </p>
            <p>
                This linear model (multi-variate or single-variable) attempts
                to minimize the error that it produces from predicting the 
                dependent variable. This "error" is the Mean-Squared-Error (MSE):
            </p>
            <BlockMath math='\mathrm{MSE} = \frac{1}{m} \sum_{i=1}^{m} (y_i - \textbf{w}^{T} \textbf{x}_i)^2'/>
            <p>
                Unlike most machine learning techniques out there, linear regression has
                a closed-form solution. For modeling the data 
                points <InlineMath math='\{(\textbf{x}_1, y_1), 
                \ \dots \ , (\textbf{x}_m, y_m)\}' 
                /> with <InlineMath math='\textbf{x}_i' /> being <InlineMath math='n'/>-
                dimensional, we need to first construct a coefficient matrix like so:
            </p>
            <BlockMath 
                math='X = \begin{bmatrix}
                    \\[-1em]
                    1 & \textbf{x}_{1}^{(1)} & \textbf{x}_{1}^{(2)} & \dots & \textbf{x}_{1}^{(n)} \\
                    1 & \textbf{x}_{2}^{(1)} & \textbf{x}_{2}^{(2)} & \dots & \textbf{x}_{2}^{(n)} \\[0.5em]
                    \vdots & \vdots & \vdots & \cdots & \vdots \\[0.5em]
                    1 & \textbf{x}_{m}^{(1)} & \textbf{x}_{m}^{(2)} & \dots & \textbf{x}_{m}^{(n)} \\[0.5em]
                \end{bmatrix}' 
            />
            <p>
                where <InlineMath math='\textbf{x}_{i}^{(j)}'/> denotes
                the <InlineMath math='j'/>-th component of vector <InlineMath math='\textbf{x}_{i}'/> in
                the dataset.
            </p>
            <p>
                We can now construct the following linear system:
            </p>
            <BlockMath math='\textbf{y} = X\textbf{w}'/>
            <p>
                where <InlineMath math='\textbf{y}'/> is a <InlineMath math='m \times 1'/> vector that
                holds <InlineMath math='y_i'/> and <InlineMath math='\textbf{w}'/> is
                a <InlineMath math='n \times 1'/> coefficient vector that is unknown.
            </p>
            <p>
                This <InlineMath math='m \times (n + 1)'/> matrix <InlineMath math='X'/> usually 
                encoded an over-determined system (for <InlineMath math='n \gg m'/>), so the solution
                for the system will minimize the following:
            </p>
            <BlockMath math='\mid\mid \textbf{y} - X\textbf{w} \mid\mid_2'/>
            <p>
                where the above quantity denotes the vector 2-norm. Minimizing the above will
                minimize the MSE! We solve the over-determined system like so:
            </p>
            <BlockMath 
                math='\begin{aligned}
                    X\textbf{w} &= \textbf{y} \\
                    \implies X^{T}X\textbf{w} &= X^{T}\textbf{y} \\
                    \implies \textbf{w} &= (X^{T}X)^{-1} X^{T}\textbf{y} \\
                    &= X^{+} \textbf{y}
                \end{aligned}'
            />
            <p>
                where <InlineMath math='X^{+}'/> denotes the pseudo-inverse
                of <InlineMath math='X'/>.
            </p>
            <p>
                Additional justification as to why the above derivation works is provided
                below:
            </p>
            <BlockMath 
                math='\begin{aligned}
                    L &= \mid\mid \textbf{y} - X\textbf{w} \mid\mid_2 \\
                    &= (\textbf{y} - X\textbf{w})^T (\textbf{y} - X\textbf{w}) \\
                    &= (\textbf{y}^T - \textbf{w}^T X^T) (\textbf{y} - X\textbf{w}) \\
                    &= \textbf{y}^T \textbf{y} - \textbf{y}^T X\textbf{w} - 
                    \textbf{w}^T X^T \textbf{y} + \textbf{w}^T X^T X \textbf{w} \\
                    &= \textbf{y}^T \textbf{y} - \textbf{y}^T X\textbf{w} - 
                    \textbf{y}^T X\textbf{w} + \textbf{w}^T X^T X \textbf{w} \\
                    &= \textbf{y}^T \textbf{y} - 2\textbf{y}^T X\textbf{w} + 
                    \textbf{w}^T X^T X \textbf{w} \\
                    \implies \frac{\partial L}{\partial \textbf{w}} &= 
                    -2X^{T} \textbf{y} + 2X^{T} X \textbf{w} = \textbf{0} \\
                    &\implies 2 X^{T} X \textbf{w} = 2 X^{T} \textbf{y} \\
                    &\implies X^{T} X \textbf{w} = X^{T} \textbf{y}
                \end{aligned}'
            />
            <p>
                where the above line is the over-determined linear system 
                we ended up constructing previously. The above line often referred to as
                linear least squares (or the Normal Equations).
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