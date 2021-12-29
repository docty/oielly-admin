import oielly from '@synevix/oielly-gateway';
import { Cage, Card, Column, Flexbox, Heading,   TableItem, TableRow, Table, Breadcrumb, Button, SearchField } from '@synevix/react-widget';
import { Children, useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import * as css from '../../utility/styling';

const Subscribe = () => (
    <>
        <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
            <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                <Cage>
                    <Button icon={'icon-circle-left2'} className={css.iconStyling} />
                    <Heading type={'H3'} text={'Subscribe'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                </Cage>
            </Flexbox>

            <Breadcrumb
                items={[
                    { text: 'Dashboard', url: '/v1/dashboard' },
                    { text: 'Subscribe', url: '' }
                ]} />
        </Card>
        <Content />
    </>
)


const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [Subscribe, setSubscribe] = useState<any[]>([]);
    const tableHeader = ["SN",   "Email",   "Action"];

    useEffect(() => {
        oielly.subscribe.list({
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setSubscribe(success);
                setLoading(false);
            },
        });
    }, [])


    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Flexbox className={'mb-8'}>
                    <Column lg={'4'} className={'mr-auto'}>
                        <SearchField
                            placeholder={"Search"}
                            style={{ marginBottom: '0' }}
                            onValueChange={(e:any) => console.log(e)}
                        />
                    </Column>

                </Flexbox>

                <Table header={tableHeader}>
                     
                        {
                            Children.toArray(Subscribe.map(((item, index: number) => (
                                <TableRow>
                                    <TableItem>{index + 1}</TableItem>
                                    <TableItem>{item.email}</TableItem>
                                </TableRow>
                            ))))
                        }
 
                </Table>
                {loading && (<Spinner />)}

            </Card>


        </Cage>
    )
}
export default Subscribe;