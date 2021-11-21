import { useState, useCallback, useRef } from 'react';
import oielly from '@synevix/oielly-gateway';
import ProductUpload from "../../components/ProductUpload";
import { IProductAdd, IResponse } from '../../interface';
import { Link, useHistory } from 'react-router-dom';
import { TextArea, Breadcrumb, Button, Card, Cage, Flexbox, Heading, Icon, TextField, Option, Grid } from '@synevix/react-widget';
import * as css from '../../utility/styling';
import { Chain } from '../../components/Chain';
import { Toast } from '../../components/Toast';

const Product_Add = () => {
    const history = useHistory();
    return (
        <>
            <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
                <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                    <Cage>
                        <Button onClick={() => history.goBack()} icon={'icon-circle-left2'} className={css.iconStyling} />
                        <Heading type={'H3'} text={'Product Add'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                    </Cage>
                    <Link to={'/v1/product/material/list'} className={css.buttonLink}>
                        <Icon name={'icon-list'} />
                    </Link>
                </Flexbox>

                <Breadcrumb
                    items={[
                        { text: 'Dashboard', url: '/v1/dashboard' },
                        { text: 'Product', url: '/v1/product/material/list' },
                        { text: 'Add', url: '' }
                    ]} />
            </Card>
            <Content />
        </>
    )
}

const Content = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<IProductAdd>({} as IProductAdd);
    const [error,] = useState<IProductAdd>({} as IProductAdd);
    const [files, setFiles] = useState<any[]>([]);
    const [navState, setNavState] = useState<number>(0);
    const toastRef = useRef<HTMLDivElement>(null);
    const [response, setResponse] = useState<IResponse>({} as IResponse);

    const callback = useCallback((e: IProductAdd) => {
        setState(e);
    }, []);

    const imageCallback = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const onFormSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        
        files.forEach(element => {
            formData.append("personal", element);
        });

        formData.append('name', 'docty');
        formData.append("materialName", state.materialName);
        formData.append("price", state.price);
        formData.append("quantity", state.quantity);
        formData.append("category", state.category);
        formData.append("tag", state.tag);
        formData.append("description", state.description);
        formData.append("clientId", state.clientId);
        formData.append("marketId", state.marketId);

        oielly.product.create({
            data: formData,
            response: (success: any, error: any) => {
                toastRef.current!.style.display = 'flex'
                setLoading(false);
                if (error) {
                    setResponse({ text: error.toString(), color: 'red', icon: 'icon-info3' })
                    return
                }
                setResponse({ text: success.toString(), color: 'green', icon: 'icon-info3' });
                setState({} as IProductAdd)
            }
        })
    }

    const onContinue = () => {
        setNavState((prev) => prev + 1)
        if (navState === 2) {
            onFormSubmit()
            return;
        }
    }

    return (
        <Cage className={css.contentStyling}>
            <Card className={'mb-2 ' + css.cardStyling}>
                <Chain state={navState} item={['Billing', 'Upload', 'Client']} />
            </Card>


            <Card className={[css.cardStyling, 'w-1/2 mx-auto mt-12'].join(' ')}>

                {
                    navState === 0
                        ? <BillingInfo cb={callback} state={state} />
                        : navState === 1
                            ? <ProductImage cb={imageCallback} state={files} />
                            : <ClientData cb={callback} error={error} state={state} />
                }

                <Flexbox justifyContent={'between'}>
                    {
                        navState > 0 &&
                        <Button
                            text={'Previous'}
                            onClick={() => setNavState((prev) => prev - 1)}
                            bgColor={'pink'}
                            className={'text-white p-2 font-bold w-4/12 mt-3'}
                        />
                    }
                    <Button
                        text={navState === 2 ? 'Submit' : 'Next'}
                        onClick={onContinue}
                        bgColor={'pink'}
                        isLoading={loading}
                        className={`text-white p-2 font-bold w-4/12 mt-3  ${loading && 'cursor-not-allowed'}`}
                    />
                </Flexbox>

                <Toast {...response} refer={toastRef} className={'hidden'} />
            </Card>

        </Cage>
    )
}

const BillingInfo = ({ cb, state }: { cb: (e: IProductAdd) => void, state: IProductAdd }) => (
    <Grid gap={'7'} className={''}>

        <TextField
            value={state.materialName}
            placeholder={'Enter Material Name'}
            onValueChange={(e) => cb({ ...state, materialName: e.target.value })}
        />

        <TextField
            value={state.manufacturerBrand}
            placeholder={'Enter Manufacturer Brand'}
            onValueChange={(e) => cb({ ...state, manufacturerBrand: e.target.value })}
        />

        <TextField
            value={state.price}
            placeholder={'Enter Price '}
            onValueChange={(e) => cb({ ...state, price: e.target.value })}
        />

        <TextField
            value={state.quantity}
            placeholder={'Enter Quantity '}
            type={'number'}
            onValueChange={(e) => cb({ ...state, quantity: e.target.value })}
        />

        <Option
            value={state.category}
            item={['Select Category', 'GTP', 'Woodin', 'Holland']}
            onValueChange={(e) => cb({ ...state, category: e.target.value })}
        />

        <Option
            value={state.tag}
            item={['Select Tag', 'Wedding', 'Dinner', 'Church', 'Office']}
            onValueChange={(e) => cb({ ...state, tag: e.target.value })}
        />

        <TextArea
            placeholder={'Enter Description'}
            style={{ border: '1px solid black', borderRadius: '5px', width: '100%' }}
            value={state.description}
            onValueChange={(e) => cb({ ...state, description: e.target.value })}
        />
    </Grid>
)


const ProductImage = ({ cb, state }: { cb: (e: any[]) => void, state: any[] }) => (
    <Cage className="p-4 border-top">
        <ProductUpload cb={cb} state={state} />
    </Cage>
)


const ClientData = ({ cb, error, state }: { cb: (e: IProductAdd) => void, error: IProductAdd, state: IProductAdd }) => {
    const [clientName, setClientName] = useState<string>('');
    const [marketName, setMarketName] = useState<string>('');

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

        cb({ ...state, clientId: clientId })

    }

    const changemarketId = (e: any) => {
        const marketId = e.target.value;
        oielly.market.query({
            marketId,
            response: (success: any, error: any) => {
                console.log(success, error)
                if (error) {
                    console.log(error);
                    return;
                }
                if (!Object.values(success).length) {
                    setMarketName('Not Found');
                    return;
                }
                setMarketName(success.marketName)
            }
        });

        cb({ ...state, marketId: marketId })

    }

    return (

        <Grid gap={'4'} className={''}>
            <TextField
                value={state.clientId}
                placeholder={'Enter Client Id'}
                onValueChange={changeClientId}
            />
            {
                clientName === 'Not Found'
                    ? <p style={{ color: 'red', fontStyle: 'italic' }} className={'-mt-3 mb-2 pl-4'}>{clientName}</p>
                    : <p className={'-mt-3 mb-2 pl-4'}>{clientName}</p>
            }

            <TextField
                value={state.marketId}
                placeholder={'Enter Maket Id'}
                onValueChange={changemarketId}
            />
            {
                marketName === 'Not Found'
                    ? <p style={{ color: 'red', fontStyle: 'italic' }} className={'-mt-3 mb-2 pl-4'}>{marketName}</p>
                    : <p className={'-mt-3 mb-2 pl-4'}>{marketName}</p>
            }
        </Grid>


    )

}

export interface IData {
    id: number;
    marketName: string;
    marketId: string;
    fullName: string;
    clientId: string;
    productCount: number;
    balance: number;
}

export default Product_Add;
