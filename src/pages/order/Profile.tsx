import { useEffect, useState, Children, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Image,
    Cage,
    Flexbox,
    Heading,
    Grid,
    Card,
    Column,
    TableRow,
    Table,
    TableHeader,
    TableItem,
    Option,
    Avatar,
    Paragraph,
    Breadcrumb,
    Button,
    Icon,
    Spinner
} from "@synevix/react-widget";
import oielly from "@synevix/oielly-gateway";
import { IOrderSummary, IPayment, IResponse } from "../../interface";
import * as css from "../../utility/styling";
import Modal from "../../components/Modal";
import img from "../../assets/images/product/img-1.png";
import { style } from 'typestyle'
import { Toast } from "../../components/Toast";

const Order_Profile = () => (
    <>
        <Card className={css.cardStyling} style={{ borderRadius: "unset" }}>
            <Flexbox
                alignItems={"center"}
                justifyContent={"between"}
                style={{ borderBottom: "1px solid #eee", marginBottom: "0.5rem" }}
            >
                <Cage>
                    <Button icon={"icon-circle-left2"} className={css.iconStyling} />
                    <Heading
                        type={"H3"}
                        text={"Order Profile"}
                        className={css.pageTitle}
                        style={{ fontSize: "2rem" }}
                    />
                </Cage>
                <Link to={"/v1/order/list"} className={css.buttonLink}>
                    <Icon name={"icon-list"} />
                </Link>
            </Flexbox>
            <Breadcrumb
                items={[
                    { text: "Dashboard", url: "/v1/dashboard" },
                    { text: "Order", url: "/v1/order/list" },
                    { text: "Profile", url: "" },
                ]}
            />
        </Card>
        <Content />
    </>
);

const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [state, setState] = useState<IOrderSummary>({} as IOrderSummary);
    const [modal, setModal] = useState<boolean>(false);
    const [queryData, setQueryData] = useState<any>({} as any);
    const [status, setStatus] = useState<string>("pending");
    const [payment, setPayment] = useState<IPayment>({} as IPayment);
    const params = useParams<any>();
    const toastRef = useRef<HTMLDivElement>(null);
    const toastVerifyRef = useRef<HTMLDivElement>(null);
    const [response, setResponse] = useState<IResponse>({} as IResponse);
    const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
    const [responseVerify, setResponseVerify] = useState<IResponse>({} as IResponse);


    useEffect(() => {
        oielly.order.profile({
            referenceId: params.referencing,
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setState(success);
                setLoading(false);
                setStatus(success.status);
            },
        });
        fetch('http://192.168.43.146:1337/api/wallet/transaction/verify/sbfsqiyq9z')
            .then(res => res.json())
            .then(result => { setPayment(result.data.data); console.log(result.data.data.customer)})
            .catch(err => console.error(err))
    }, [params.referencing]);

    const autoSearch = (productId: string) => {
        setModal(true);
        oielly.product.query({
            productId,
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(success)
                setQueryData(success);
            },
        });
    };

    const changeStatus = () => {
        const urlencoded = new URLSearchParams();
        urlencoded.append("status", status);
        console.log(status);
        oielly.order.updateStatus({
            referenceId: state.referenceId,
            status: urlencoded,
            response: (success: any, error: any) => {
                toastRef.current!.style.display = 'flex'
                if (error) {
                    console.log(error);
                    return;
                }
                setResponse({ text: success.message.toString(), color: 'green', icon: 'icon-info3' });
                setState({ ...state, status });
                setTimeout(() => {
                    toastRef.current!.style.display = 'none'
                }, 2000)
            },
        });
    };

    const paymentVerify = () => {
        setLoadingVerify(true);
        fetch('http://192.168.43.146:1337/api/wallet/transaction/verify/sbfsqiyq9z')
            .then(res => res.json())
            .then(result => {
                console.log(result.data.data.gateway_response);
                toastVerifyRef.current!.style.display = 'flex';
                setResponseVerify({ text: result.data.data.gateway_response.toString(), color: 'green', icon: 'icon-info3' });
                setLoadingVerify(false);
            })
            .catch(err => console.error(err))
        // TODO: Insert into database
    }
    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Toast {...response} refer={toastRef} className={'hidden'} />
                <Flexbox className={"mb-8"} justifyContent={'between'} alignItems={'center'}>
                    <Column>
                        <Paragraph text={"Wed, Aug 13, 2020, 4:34PM"} />
                        <Paragraph text={'#' + state.orderId} />
                    </Column>
                    <Column>
                        <Option
                            item={["Pending", "Processing", "Delivering", "Complete"]}
                            value={status}
                            onValueChange={(e: any) => setStatus(e.target.value)}
                            style={{ display: "inline", borderRadius: '5px 0 0 5px' }}
                        />
                        <Button icon={"icon-floppy-disk"} onClick={changeStatus} className={`text-white p-2 border border-green-500 ${statusBtnStyling}`} bgColor={'green'} />
                    </Column>

                </Flexbox>
                <Flexbox className={"divide-black"}>
                    <Column lg={"4"}>
                        <Cage className={"inline-flex"}>
                            <Avatar
                                icon={"icon-user"}
                                className={css.avatatStyling}
                                iconSize={"20px"}
                            />
                            <Cage className={"ml-4"}>
                                <Heading
                                    type={"H6"}
                                    text={"Guest"}
                                    className={"font-bold text-base"}
                                />
                                <Paragraph
                                    text={
                                        state.Guest &&
                                        `${state.Guest.surname}  ${state.Guest.otherName}`
                                    }
                                    className={"py-2"}
                                />
                                <Paragraph
                                    text={state.Guest && state.Guest.contact}
                                    className={"py-2"}
                                />
                                <Paragraph
                                    text={state.Guest && state.Guest.email}
                                    className={"py-2"}
                                />
                            </Cage>
                        </Cage>
                    </Column>
                    <Column lg={"4"}>
                        <Cage className={"inline-flex"}>
                            <Avatar
                                icon={"icon-info22"}
                                className={css.avatatStyling}
                                iconSize={"20px"}
                            />
                            <Cage className={"ml-4"}>
                                <Heading
                                    type={"H6"}
                                    text={"Order Info"}
                                    className={"font-bold text-base"}
                                />
                                <Paragraph text={"Location"} className={"py-2"} />
                                <Paragraph
                                    text={
                                        state.price &&
                                        state.price
                                            .reduce((ini, value) => ini + parseFloat(value), 0)
                                            .toString()
                                    }
                                    className={"py-2"}
                                />
                                <Paragraph text={state.status} className={"py-2 capitalize"} />
                            </Cage>
                        </Cage>
                    </Column>
                    <Column lg={"4"}>
                        <Cage className={"inline-flex"}>
                            <Avatar
                                icon={"icon-truck"}
                                className={css.avatatStyling}
                                iconSize={"20px"}
                            />
                            <Cage className={"ml-4"}>
                                <Heading
                                    type={"H6"}
                                    text={"Deliver To"}
                                    className={"font-bold text-base"}
                                />
                                <Paragraph text={"City / GPS"} className={"py-2"} />
                                <Paragraph text={state.city} className={"py-2"} />
                                <Paragraph text={"house number"} className={"py-2"} />
                                <Paragraph text={state.houseNumber} className={"py-2"} />
                                <Paragraph text={"GPS"} className={"py-2"} />
                                <Paragraph text={state.gps} className={"py-2"} />
                            </Cage>
                        </Cage>
                    </Column>
                </Flexbox>
                <Grid md={'3'} gap={'4'} >
                    <Column className={'col-span-2'}>
                        <Table>
                            <thead>
                                <TableRow>
                                    <TableHeader>SN</TableHeader>
                                    <TableHeader>Product ID</TableHeader>
                                    <TableHeader>Price</TableHeader>
                                    <TableHeader>Quantity</TableHeader>
                                    <TableHeader>Total</TableHeader>

                                    <TableHeader>Action</TableHeader>
                                </TableRow>
                            </thead>
                            <tbody>
                                {state.productId &&
                                    Children.toArray(state.productId.map((item, index: number) => (
                                        <TableRow>
                                            <TableItem>{index + 1}</TableItem>
                                            <TableItem>{item}</TableItem>
                                            <TableItem>{state.price[index]}</TableItem>
                                            <TableItem>{state.quantity[index]}</TableItem>
                                            <TableItem>
                                                {parseFloat(state.price[index]) *
                                                    parseFloat(state.quantity[index])}
                                            </TableItem>
                                            <TableItem>
                                                <Button
                                                    icon={"icon-search4"}
                                                    text={"Search"}
                                                    onClick={() => autoSearch(item)}
                                                />{" "}
                                            </TableItem>
                                        </TableRow>
                                    )))}
                            </tbody>
                        </Table>
                    </Column>
                    <Column >
                        <Card className={'border'}>
                            <Paragraph text={"Payment Info"} className={'font-bold text-base mb-3 bg-gray-800 text-white p-1'} />
                            <Grid md={'2'} gap={'5'}>
                                <Paragraph text={"Full Name"} className={'font-bold'} />
                                <Paragraph text={payment.customer?.last_name} />
                                <Paragraph text={"Contact"} className={'font-bold'} />
                                <Paragraph text={payment.customer?.phone} />
                                <Paragraph text={"Status"} className={'font-bold'} />
                                <Paragraph text={payment.gateway_response} />
                                <Paragraph text={"Amount"} className={'font-bold'} />
                                <Paragraph text={payment.amount + ''} />
                                <Paragraph text={"Reference"} className={'font-bold'} />
                                <Paragraph text={payment.reference} />
                            </Grid>
                            <Button text={'Verify Payment'} bgColor={'pink'} className={'p-1 mt-3 text-white w-4/12'} onClick={paymentVerify} isLoading={loadingVerify} />
                            <Toast {...responseVerify} refer={toastVerifyRef} className={'hidden'} />
                        </Card>
                    </Column>
                </Grid>
                {loading && <Spinner type={'circle'} />}
            </Card>

            <Modal
                isOpen={modal}
                setOpen={() => setModal(false)}
                title={"Search Material"}
            >
                <Grid lg={"2"} gap={"3"}>
                    <Card className={css.cardStyling}>
                        <Image alt={"Product"} source={img} />
                    </Card>
                    <Card className={css.cardStyling}>
                        <Grid md={"2"} gap={'4'}>
                            <Paragraph text={"Material Name"} className={"font-bold"} />
                            <Paragraph text={queryData.materialName} />
                            <Paragraph text={"Product Id"} className={"font-bold"} />
                            <Paragraph text={queryData.productId} />
                            <Paragraph text={"Price"} className={"font-bold"} />
                            <Paragraph text={`GHC ${queryData.price}`} />
                            <Paragraph text={"Stk Quantity"} className={"font-bold"} />
                            <Paragraph text={queryData.quantity} />
                        </Grid>
                    </Card>
                </Grid>
                <Flexbox className={"mt-3"} justifyContent={"between"}>
                    <Button
                        className={"p-2"}
                        icon={"icon-envelope"}
                        text={"Ping Client"}
                    />
                    <Cage>
                        <Icon name={"icon-phone"} className={"icon-phone"} />
                        <Paragraph text={queryData.Client && queryData.Client.contact} className={"pl-2 inline-block"} />
                    </Cage>
                    <Cage>
                        <Icon name={"icon-user"} />
                        <Paragraph text={queryData.Client && queryData.Client.surname + ' ' + queryData.Client.otherName} className={"pl-2 inline-block"} />
                    </Cage>
                </Flexbox>

            </Modal>
        </Cage>
    );
};

const statusBtnStyling = style({
    borderLeft: 'unset',
    borderRadius: '0 5px 5px 0',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
})

export default Order_Profile;
