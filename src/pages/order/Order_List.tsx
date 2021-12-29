import { useEffect, useState, Children } from "react";
import { Link } from "react-router-dom";
import {
    Avatar,
    Cage,
    Card,
    Column,
    Flexbox,
    Heading,
    Option,
    Button,
    Breadcrumb,
    Paragraph,
    Pagination,
    Spinner,
    Grid,
    SearchField
} from "@synevix/react-widget";
import oielly from "@synevix/oielly-gateway";
import classnames from "classnames";
import { IOrder } from "../../interface";
import * as css from "../../utility/styling";


const Pending = () => (
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
                        text={"Order Lists"}
                        className={css.pageTitle}
                        style={{ fontSize: "2rem" }}
                    />
                </Cage>
            </Flexbox>

            <Breadcrumb
                items={[
                    { text: "Dashboard", url: "/v1/dashboard" },
                    { text: "Order List", url: "" },
                ]}
            />
        </Card>
        <Content />
    </>
);

const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const divider = 10;
    const [dataSize, setDataSize] = useState<{ min: number, max: number }>({ min: 1, max: divider });
    const [state, setState] = useState<IOrder[]>([]);
    const [status, setStatus] = useState<string>("pending");

    useEffect(() => {
        oielly.order.list({
            status: status,
            range: {min:dataSize.min, max:dataSize.max}, 
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setState(success); 
                setLoading(false);
            },
        });
    }, [dataSize.max, dataSize.min, status]);

    const paginationAction = (value: number) => {
        setDataSize({ ...dataSize, min: value - divider + 1, max: value })
        console.log((value - 10 + 1), '----', value)
    }

    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Flexbox className={"mb-8"} justifyContent={'between'}>
                    <Column>
                        <SearchField
                            placeholder={"Search"}
                            style={{ marginBottom: "0" }}
                            onValueChange={(e: any) => console.log(e)}
                        />
                    </Column>
                    <Column   >
                        <Option
                            item={["pending", "processing", "delivering", "complete"]}
                            value={status}
                            onValueChange={(e: any) => setStatus(e.target.value)}
                        />
                    </Column>
                </Flexbox>
                <Grid lg={'4'} md={'3'} sm={'2'} gap={'3'}>
                    {
                        Children.toArray(state.map(item => (
                            <Link to={item.referenceId + "/profile"}>
                                <Card className={classnames([css.cardStyling, "flex"])}>
                                    <Avatar text={"HK"} />
                                    <Cage className={"mx-5"}>
                                        <Heading
                                            type={"H4"}
                                            text={'#' + item.orderId}
                                            className={"font-bold text-base"}
                                        />
                                        <Paragraph
                                            text={"GHC " + item.price}
                                            className={"text-sm italic block"}
                                        />
                                        {/* TODO: Fix Date */}
                                        <Paragraph
                                            text={"09/09/2021"}
                                            className={"text-sm italic block"}
                                        />

                                    </Cage>
                                </Card>
                            </Link>
                        )))
                    }
                </Grid>

                {loading && <Spinner type={'circle'} />}
                <Cage className={"pt-5"}>
                    
                    <Pagination length={state.length} url={"/v1/order/list"} align={"center"} actionHandler={paginationAction} divider={divider} />

                </Cage>
            </Card>
        </Cage>
    );
};


export default Pending;
