import { Cage, Flexbox, Heading, TextField, Option, Button, Breadcrumb, Card, Icon, Grid, Form } from '@synevix/react-widget';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import oielly from "@synevix/oielly-gateway";
import { IClient, IResponse } from '../../interface';
import * as css from '../../utility/styling';
import { Toast } from '../../components/Toast';


const Client_Add = () => (
    <>
        <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
            <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                <Cage>
                    <Button icon={'icon-circle-left2'} className={css.iconStyling} />
                    <Heading type={'H3'} text={'Client Add'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                </Cage>
                <Link to={'/v1/entries/client/list'} className={css.buttonLink}>
                    <Icon name={'icon-list'} />
                </Link>
            </Flexbox>

            <Breadcrumb
                items={[
                    { text: 'Dashboard', url: '/v1/dashboard' },
                    { text: 'Client', url: '/v1/entries/client/list' },
                    { text: 'Add', url: '' }
                ]} />
        </Card>
        <Content />
    </>
)


const Content = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<IClient>({} as IClient);
    const toastRef = useRef<HTMLDivElement>(null); 
    const [response, setResponse] = useState<IResponse>({} as IResponse);
    
     
    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        toastRef.current!.style.display = 'none' 
         

        oielly.client.create({
            data: { ...state },
            response: (success: any, error: any) => {
                 toastRef.current!.style.display = 'flex'
                 setLoading(false);
                if (error) { 
                    setResponse({text: error.toString(), color: 'red', icon: 'icon-info3'})
                    return 
                }
                setResponse({text: success.toString(), color: 'green', icon: 'icon-info3'});
                setState({} as IClient)
            }
        })
 
    }
    return (
        <Cage className={css.contentStyling}>
            <Card className={[css.cardStyling, 'w-1/2 mx-auto'].join(' ')}>
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
                            onValueChange={(e) => setState({ ...state, gender: e.target.value })}
                        />
                        <Button
                            text={'SAVE'}
                            bgColor={'pink'}
                            type={'submit'}
                            isLoading={loading}
                            className={`text-white p-2 font-bold w-4/12  ${loading && 'cursor-not-allowed'}`}
                        />
                    </Grid>
                </Form>
                <Toast {...response} refer={toastRef} className={'hidden'} />
            </Card>
        </Cage>
    )
}

export default Client_Add;