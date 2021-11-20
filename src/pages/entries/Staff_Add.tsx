import { Cage, Card, Flexbox, Heading, Option, TextField, Button, Icon, Grid, Breadcrumb, Form } from '@docty68/widget';
import oielly from "@docty68/oielly-gateway";
import { useRef, useState } from 'react';
import { Link, useHistory, } from 'react-router-dom'
import * as css from '../../utility/styling';


import { IResponse, IStaff } from '../../interface'; 
import { Toast } from '../../components/Toast';



const Staff_Add = () => {
    const history = useHistory()

    return (
        <>
            <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
                <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                    <Cage>
                        <Button onClick={() => history.goBack()} icon={'icon-circle-left2'} className={css.iconStyling} style={{ color: "#000" }} />
                        <Heading type={'H3'} text={'Staff Add'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                    </Cage>
                    <Link to={'/v1/entries/staff/list'} className={css.buttonLink}>
                        <Icon name={'icon-list'} />
                    </Link>
                </Flexbox>

                <Breadcrumb
                    items={[
                        { text: 'Dashboard', url: '/v1/dashboard' },
                        { text: 'Staff', url: '/v1/entries/staff/list' },
                        { text: 'Add', url: '' }
                    ]} />
            </Card>
            <Content />
        </>
    )
}

const Content = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<IStaff>({} as IStaff);
    const toastRef = useRef<HTMLDivElement>(null); 
    const [response, setResponse] = useState<IResponse>({} as IResponse);
     

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        toastRef.current!.style.display = 'none' 

        oielly.staff.create({
            data: { ...state },
            response: (success: any, error: any) => {
                 toastRef.current!.style.display = 'flex'
                 setLoading(false);
                if (error) { 
                    setResponse({text: error.toString(), color: 'red', icon: 'icon-notification2'})
                    return 
                }
                setResponse({text: success.message.toString(), color: 'green', icon: 'icon-info3'});
                setState({} as IStaff)
            }
        })

    }

    return (
        <Cage className={css.contentStyling}>
            <Card className={[css.cardStyling, 'w-1/2 mx-auto p-6 rounded-md'].join(' ')}>
                <Form onSubmit={onFormSubmit}>
                    <Grid gap={'4'} className={''}>
                        <TextField
                            value={state.surname}
                            placeholder={'Enter Surname'}
                            onValueChange={(e) => setState({ ...state, surname: e.target.value })}
                            required
                        />
                        <TextField
                            value={state.otherName}
                            placeholder={'Enter Other Name'}
                            onValueChange={(e) => setState({ ...state, otherName: e.target.value })}
                            required
                        />
                        <TextField
                            value={state.email}
                            type={'email'}
                            placeholder={'Enter Email'}
                            onValueChange={(e) => setState({ ...state, email: e.target.value })}
                            required
                        />
                        <TextField
                            value={state.contact}
                            type={'tel'}
                            placeholder={'Enter Contact'}
                            onValueChange={(e) => setState({ ...state, contact: e.target.value })}
                            required
                        />

                        <Option
                            value={state.gender}
                            item={['Gender', 'Male', 'Female']}
                            onValueChange={(e: any) => setState({ ...state, gender: e.target.value })}
                        />
                        <Button
                            text={'SAVE'}
                            bgColor={'green'}
                            type={'submit'}
                            isLoading={loading}
                            className={`text-white p-2 font-bold w-4/12  ${loading && 'cursor-not-allowed'}`}
                        />
                    </Grid>
                </Form>
                <Toast {...response} refer={toastRef} className={'hidden'}/>   
            </Card>
        </Cage>
    )
}


export default Staff_Add;