import oielly from '@docty68/oielly-gateway';
import { Cage, Card, Column, Flexbox, Heading, TableHeader, TableItem, TableRow, Table, Breadcrumb, Button, SearchField} from '@docty68/widget';
import { Children, useEffect, useState } from 'react';
import Spinner from '../../components/Spinner'; 
import * as css from '../../utility/styling';

const Review = () => (
    <>
        <Card className={css.cardStyling} style={{ borderRadius: 'unset' }}>
            <Flexbox alignItems={'center'} justifyContent={'between'} style={{ borderBottom: '1px solid #eee', marginBottom: '0.5rem' }}>
                <Cage>
                    <Button icon={'icon-circle-left2'} className={css.iconStyling} />
                    <Heading type={'H3'} text={'Review'} className={css.pageTitle} style={{ fontSize: '2rem' }} />
                </Cage>
            </Flexbox>

            <Breadcrumb
                items={[
                    { text: 'Dashboard', url: '/v1/dashboard' },
                    { text: 'Review', url: '' }
                ]} />
        </Card>
        <Content />
    </>
)


const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [review, setReview] = useState<any[]>([]);


    useEffect(() => {
        oielly.review.list({
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setReview(success);
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
                            onValueChange={(e) => console.log(e)}
                        />
                    </Column>
                     
                </Flexbox>

                <Table>
                    <thead>
                        <TableRow>

                            <TableHeader>SN</TableHeader>
                            <TableHeader>Product ID</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Email</TableHeader>
                            <TableHeader>Message</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {
                            Children.toArray(review.map(((item, index:number) => (
                                <TableRow>
                                    <TableItem>{index+1}</TableItem>
                                    <TableItem>{item.productId}</TableItem>
                                    <TableItem>{item.name}</TableItem>
                                    <TableItem>{item.email}</TableItem>
                                    <TableItem>{item.message}</TableItem>
                                </TableRow>
                            ))))
                        }

                    </tbody>
                </Table>
                {loading && (<Spinner />)}

            </Card>


        </Cage>
    )
}
export default Review;