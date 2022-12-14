import { Image, Breadcrumb, Button, Cage, Card, Grid, Flexbox, Heading, Icon, Paragraph, SearchField } from '@synevix/react-widget';
import { useState, useEffect } from "react";
import oielly from "@synevix/oielly-gateway";
import Spinner from "../../components/Spinner";
import { Link, useHistory } from 'react-router-dom';
import * as css from '../../utility/styling';
import classnames from 'classnames'
import { IProductMaterial } from '../../interface';

const Product_List = () => {
    const history = useHistory();
    return(
    <>
        <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
            <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                <Cage>
                    <Button onClick={() => history.goBack()} icon={'icon-circle-left2'} className={css.iconStyling} />
                    <Heading type={'H3'} text={'Product Lists'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                </Cage>
                <Link to={'/v1/product/material/add'} className={css.buttonLink}>
                    <Icon name={'icon-user-plus'} />
                </Link>
            </Flexbox>

            <Breadcrumb
                items={[
                    { text: 'Dashboard', url: '/v1/dashboard' },
                    { text: 'Product List', url: '' }
                ]} />
        </Card>
        <Content />
    </>
)
            }

const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [state, setState] = useState<IProductMaterial[]>([]);

    useEffect(() => {
        oielly.product.list({
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setState(success);
                setLoading(false);
            },
        });

    }, [])
    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Flexbox className={'mb-8'} justifyContent={'between'}>
                    <Grid >

                        <SearchField
                            placeholder={"Search"}
                            style={{ marginBottom: '0' }}
                            onValueChange={(e:any) => console.log(e)}
                        />

                    </Grid>
                    <Link  className={'text-white w-1/12 bg-green-500 flex items-center justify-center hover:bg-green-600 rounded'} to={'/v1/product/material/report'} >View Report</Link>
                </Flexbox>
                <Grid md={'3'} gap={'3'}>
                    {
                        state.map((item, index: number) => (
                            <Card key={index} style={{ margin: '0.5rem'}} className={css.cardStyling} >
                                <Link to={`/v1/product/material/${item.referenceId}/profile`}>
                                    <Image source={item.imageUrl[0]} alt={''} className={classnames(['m-auto'])} style={{ width: '100%', height: '400px' }} />
                                    <Heading type={'H5'} text={item.materialName} className={'mt-5 text-center font-bold'} />
                                    <Paragraph text={item.productId} className={'text-center'} />
                                    <Paragraph text={'GHC ' + item.price} className={'text-center'} style={{ wordWrap: 'break-word' }} />
                                </Link>
                            </Card>
                        ))
                    }
                </Grid>
                {loading && <Spinner />}
            </Card>
        </Cage>
    )
}


export default Product_List;
