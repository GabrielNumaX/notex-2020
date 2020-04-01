import React from 'react';

import css from './Loader.module.css';

const Loader = (props) => {

    // return(
    //     props.visible ?
    //     <h1 className={...}>Loading Content...</h1>
    //     :
    //     props.children 
    //     //this is an atributte  
    //   )

    return(

        props.visible ?

            <div className={css.DivLoader}>

                <div className={css.LoaderRing}>

                    Loading

                    <span className={css.Span}></span>

                </div>

            </div>
        :

        props.children
    )
}

export default Loader;