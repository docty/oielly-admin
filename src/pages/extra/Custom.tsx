//import oielly from '@synevix/oielly-gateway';
import { Cage, Card, Column, Flexbox, Heading, TableItem, TableRow, Table, Breadcrumb, Button, SearchField } from '@synevix/react-widget';
import { Children, useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import * as css from '../../utility/styling';

const Custom = () => (
    <>
        <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
            <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                <Cage>
                    <Button icon={'icon-circle-left2'} className={css.iconStyling} />
                    <Heading type={'H3'} text={'Custom'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                </Cage>
            </Flexbox>

            <Breadcrumb
                items={[
                    { text: 'Dashboard', url: '/v1/dashboard' },
                    { text: 'Custom', url: '' }
                ]} />
        </Card>
        <Content />
    </>
)


const Content = () => {
    const [loading,] = useState<boolean>(true);
    const [Custom,] = useState<any[]>([]);
    const tableHeader = ["SN", "Product ID", "Status", "Action"];

    useEffect(() => {
        // oielly.selection.list({
        //     status: 'some',
        //     response: (success: any, error: any) => {
        //         if (error) {
        //             console.log(error);
        //             return;
        //         }
        //         setCustom(success);
        //         setLoading(false);
        //     },
        // });
    }, [])


    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Flexbox className={'mb-8'}>
                    <Column lg={'4'} className={'mr-auto'}>
                        <SearchField
                            placeholder={"Search"}
                            style={{ marginBottom: '0' }}
                            onValueChange={(e: any) => console.log(e)}
                        />
                    </Column>

                </Flexbox>

                <Table header={tableHeader}>

                    {
                        Children.toArray(Custom.map(((item, index: number) => (
                            <TableRow>
                                <TableItem>{index + 1}</TableItem>
                                <TableItem>{item.productId}</TableItem>
                                <TableItem>{item.status}</TableItem>
                            </TableRow>
                        ))))
                    }

                </Table>
                {loading && (<Spinner />)}

            </Card>


        </Cage>
    )
}
export default Custom;