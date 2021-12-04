import { Cage, Card, Flexbox, Heading, TextField, Button, Icon, Breadcrumb, Grid, Form } from '@synevix/react-widget';
import { useRef, useState } from 'react';
import { Link, useHistory, } from 'react-router-dom'
import * as css from '../../utility/styling';
import { IMarketMaterial, IResponse } from '../../interface';
import oielly from '@synevix/oielly-gateway';
import { Toast } from '../../components/Toast';

const Market_Add = () => {
    const history = useHistory();
    return (
        <>
            <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
                <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                    <Cage>
                        <Button onClick={() => history.goBack()} icon={'icon-circle-left2'} className={css.iconStyling} />
                        <Heading type={'H3'} text={'Market Add'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                    </Cage>
                    <Link to={'/v1/market/material/list'} className={css.buttonLink}>
                        <Icon name={'icon-list'} />
                    </Link>
                </Flexbox>

                <Breadcrumb
                    items={[
                        { text: 'Dashboard', url: '/v1/dashboard' },
                        { text: 'Market', url: '/v1/market/material/list' },
                        { text: 'Add', url: '' }
                    ]} />
            </Card>
            <Content />
        </>
    )
}


const Content = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<IMarketMaterial>({} as IMarketMaterial);
    const toastRef = useRef<HTMLDivElement>(null);
    const [response, setResponse] = useState<IResponse>({} as IResponse);

    const [clientName, setClientName] = useState<string>('');

    const onFormSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        toastRef.current!.style.display = 'none'


        oielly.market.create({
            data: { ...state },
            response: (success: any, error: any) => {
                toastRef.current!.style.display = 'flex'
                setLoading(false);
                if (error) {
                    setResponse({ text: error.toString(), color: 'red', icon: 'icon-info3' })
                    return
                }
                setResponse({ text: success.message.toString(), color: 'green', icon: 'icon-info3' });
                setState({} as IMarketMaterial)
                setClientName('');
            }
        })
    }

    const changeClientId = (e: any) => {
        const clientId = e.target.value;
        oielly.client.query({
            clientId,
            response: (success: any, error: any) => {
                console.log(success, error)
                if (error) {
                    console.log(error);
                    return;
                }
                if (!Object.values(success).length) {
                    setClientName('Not Found');
                    return;
                }
                setClientName(`${success.otherName} ${success.surname}`)
            }
        });
        setState({ ...state, clientId: clientId })
    }

    return (
        <Cage className={css.contentStyling}>
            <Card className={[css.cardStyling, 'w-1/2 mx-auto'].join(' ')}>
                <Form onSubmit={onFormSubmit}>
                    <Grid gap={'4'} className={''}>
                        <TextField
                            value={state.marketName}
                            placeholder={'Enter Market Name'}
                            onValueChange={(e) => setState({ ...state, marketName: e.target.value })}
                        />
                        <TextField
                            value={state.location}
                            placeholder={'Enter Location'}
                            onValueChange={(e) => setState({ ...state, location: e.target.value })}
                        />
                        <TextField
                            value={state.numberOfEmployees}
                            type={'number'}
                            placeholder={'Enter Number of Employees'}
                            onValueChange={(e) => setState({ ...state, numberOfEmployees: e.target.value })}
                        />
                        <TextField
                            value={state.clientId}
                            type={'text'}
                            placeholder={'Enter Client Identity'}
                            onValueChange={changeClientId}
                        />
                        {
                            clientName === 'Not Found' ?
                                <p style={{ color: 'red', fontStyle: 'italic' }} className={'-mt-3 mb-2 pl-4'}>{clientName}</p>
                                : <p className={'-mt-3 mb-2 pl-4'}>{clientName}</p>
                        }

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


export default Market_Add;
