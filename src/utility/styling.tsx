import { style } from 'typestyle';

// *********************   GENERAL **************************
export const contentStyling = style({
    background: '#f8f9fa',
    minHeight: '100vh',
    padding: '20px',
    paddingTop: '2rem',
    
    
});

export const cardStyling = style({
    
    boxShadow: 'none',
    border: '1px solid #eee',

})

export const iconStyling = style({

    color: '#000',
    verticalAlign: 'super',
    $nest: {
        "&:hover": {
            color: '#888'
        }
    }
})

// *********************   GENERAL **************************



export const pageTitle = style({
    color: '#383e50',
    fontSize: '2.0rem',
    fontWeight: 'bold',
    display: 'inline'
});

export const buttonLink = style({
    background: '#088178',
    color: '#fff',
    padding: '0.3rem 1rem',
    borderRadius: '5px',
    fontSize: '0.875rem',
})


export const formButton = style({
    background: '#088178',
    color: '#fff',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    width: '10rem'
})


export const actionButton = style({
    background: '#088178',
    color: '#fff',
    padding: '0.3rem 1rem',
    borderRadius: '5px',
    fontSize: '0.875rem',
})
export const actionProfile = style({
    background: '#1d7c84',
    padding: '5.3px'
})

export const actionEdit = style({
    background: '#af165a',
    padding: '5.3px'
})

export const avatatStyling = style({
    background: 'rgb(114 181 188)'
})


export const gridStyling = style({
    display: 'grid',
    gap: '5px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
})

export const hideOnMobile = style({
    $nest: {
        "@media screen and (max-width: 768px)": {
            display: 'none',
        }
    }
})

export const profileCardTitle = style({
    background: '#3c9d9c',
    color: '#fff',
    margin: '-12px -12px 12px -12px',
    borderRadius: '5px 5px 0 0',
    padding: '5px',
    textAlign: 'center',
    fontWeight: 'bold'
})