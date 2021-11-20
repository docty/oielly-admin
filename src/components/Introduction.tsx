import { Card, Flexbox, Button, Heading, Cage } from "@docty68/widget";

import { IIntroduction } from "../interface";
import { style } from 'typestyle';



const Introduction = (props: IIntroduction) => {
    return(
        <Card className={introductionStyling}>
            <Flexbox justifyContent={'between'}>
                <Cage>
                    <Button text={''} icon={'fa fa-chevron-left'} className={iconStyling}/>
                    <Heading type={'H3'} text={'Dashboard'} className={'bg-500-red inline'}/>
                </Cage>
                 
            </Flexbox>
        </Card>
    )
} 
 

const introductionStyling = style({
    boxShadow: 'none',
    border: '1px solid #eee',
    marginBottom: '0.5rem',
    borderRadius: 'unset'
})

const iconStyling = style({
    background: 'transparent',
    color: 'black'

})


export default Introduction;