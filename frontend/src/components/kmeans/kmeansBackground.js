import React from 'react';
import {Header} from 'semantic-ui-react';
import { InlineMath, BlockMath } from 'react-katex';

export const KMeansBackground = _ => {
    return (
        <div className='kmeans__background'>
            <Header size='huge'>
                Background
            </Header>
            <p>
                <InlineMath math='k' />-means clustering is an unsupervised 
                algorithm that partitions <InlineMath math='m' /> data
                points <InlineMath math='\{ \textbf{x}_1, \ \dots \ , \textbf{x}_m \}' /> in
                to <InlineMath math='k' /> groups/clusters. Each data
                point <InlineMath math='\textbf{x}_i' /> is a <InlineMath math='n' />-dimensional 
                point and is placed in the cluster with the nearest mean. 
                Presented below is what <InlineMath math='k' />-means tries to minimize:
            </p>
            <BlockMath math='\sum_{i=1}^{k} 
            \sum_{\textbf{x} \in C_i} || \textbf{x} - \bm{\mu}_i ||^2'
            />
            <p>
                where <InlineMath math='C_i \in \{ C_1, \ \dots \ , C_k \}' /> denotes
                the clusters and <InlineMath math='\bm{\mu}_i' /> denotes the mean of
                cluster <InlineMath math='C_i' />. The above quantity can be referred to as
                a within-cluster sum of squares. The distance metric used here is the
                squared euclidean distance.
            </p>
            <Header size='large'>References:</Header>
            <ul>
                <li>
                    <a 
                        href='https://en.wikipedia.org/wiki/K-means_clustering' 
                        target="_blank"
                    >
                        Wikipedia
                    </a>
                </li>
            </ul>
        </div>
    );
}