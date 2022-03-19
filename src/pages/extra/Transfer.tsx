import {
    Paragraph, Cage, Card, Grid, Flexbox, Heading,  TableItem,
    TableRow, TextField, Table, Option, Breadcrumb, Button 
} from '@synevix/react-widget';
import { useEffect, useState, Children } from 'react';
import Spinner from '../../components/Spinner';


import * as css from '../../utility/styling';


const Transaction = () => (
    <>
        <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
            <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                <Cage>
                    <Button icon={'icon-circle-left2'} className={css.iconStyling} />
                    <Heading type={'H3'} text={'Transfer'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                </Cage>
            </Flexbox>

            <Breadcrumb
                items={[
                    { text: 'Dashboard', url: '/v1/dashboard' },
                    { text: 'Transfer', url: '' }
                ]} />
        </Card>
        <Content />
    </>
)


const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [state, setState] = useState<any[]>([]);
    const [itemSelect, setItemSelect] = useState<ITransaction>({} as ITransaction);
    const tableHeader = ["SN", "Reference", "Paid", "Guest", "Contact", "Action"];

    useEffect(() => {
        fetch('http://127.0.0.1:1337/api/wallet/transfer/')
            .then(res => res.json())
            .then(result => { setLoading(false); setState(result.data); })
            .catch(err => console.error(err))
    }, [])


    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Flexbox className={'mb-8'}>
                    <Grid lg={'4'} className={'mr-auto'}>
                        <TextField
                            type={"text"}
                            placeholder={"Search"}
                            style={{ marginBottom: '0' }}
                            onValueChange={(e) => console.log(e)}
                        />
                    </Grid>
                    <Grid lg={'2'} className={'m-auto'}>
                        <Option
                            item={['MTN', 'Vodfone', 'AirtelTigo']}
                            value={''}
                        />
                    </Grid>
                </Flexbox>
                <Flexbox>
                    <Grid lg={'8'}>
                        <Table header={tableHeader}>
                            {
                                Children.toArray(state.map((item:any) => (
                                    <TableRow>
                                        <TableItem>1</TableItem>
                                        <TableItem>{item.reference}</TableItem>
                                        <TableItem>{item.amount/100}</TableItem>
                                        <TableItem>{item.customer.first_name} {item.customer.last_name}</TableItem>
                                        <TableItem>{item.customer.phone}</TableItem>
                                        <TableItem>
                                            <Button icon={'icon-file-text'} onClick={() => setItemSelect(item)}/>
                                        </TableItem>
                                    </TableRow>

                                )))
                            }

                        </Table>
                        {loading && (<Spinner />)}
                    </Grid>
                    <Grid lg={'4'}>
                        <Card className={css.cardStyling}>
                            <Heading type={'H3'} text={'Details'} className={'font-bold text-base'} />
                            <hr />
                            <Grid md={'2'} gap={'4'}>
                                <Paragraph text={'Date'} />
                                <Paragraph text={itemSelect.paidAt} />
                                <Paragraph text={'Status'} />
                                <Paragraph text={itemSelect.status} />
                                <Paragraph text={'Amount'} />
                                <Paragraph text={itemSelect.amount+''} />
                                <Paragraph text={'Reference'} />
                                <Paragraph text={itemSelect.reference} />
                                <Paragraph text={'Response'} />
                                <Paragraph text={itemSelect.gateway_response} />
                                <Paragraph text={'Channel'} />
                                <Paragraph text={itemSelect.channel} />
                                <Paragraph text={'First Name'} />
                                <Paragraph text={itemSelect.customer?.first_name} />
                                <Paragraph text={'Last Name'} />
                                <Paragraph text={itemSelect.customer?.last_name} />
                                <Paragraph text={'Email'} />
                                <Paragraph text={itemSelect.customer?.email} />
                                <Paragraph text={'Contact'} />
                                <Paragraph text={itemSelect.customer?.phone} />
                            </Grid>
                        </Card>
                    </Grid>
                </Flexbox>
            </Card>


        </Cage>
    )
}

interface ITransaction {
    paidAt: string;
    status: string;
    reference: string;
    gateway_response: string;
    channel: string;
    amount: number;
    customer: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    };
}


export default Transaction;