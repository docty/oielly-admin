import { useEffect, useState, Children } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    Avatar,
    Cage,
    Card, 
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


const Product_Report = () => {
    const history = useHistory();
    return (
        <>
            <Card className={css.cardStyling} style={{ borderRadius: "unset" }}>
                <Flexbox
                    alignItems={"center"}
                    justifyContent={"between"}
                    style={{ borderBottom: "1px solid #eee", marginBottom: "0.5rem" }}
                >
                    <Cage>
                        <Button onClick={() => history.goBack()} icon={"icon-circle-left2"} className={css.iconStyling} />
                        <Heading
                            type={"H3"}
                            text={"Product Report"}
                            className={css.pageTitle}
                            style={{ fontSize: "2rem" }}
                        />
                    </Cage>
                </Flexbox>

                <Breadcrumb
                    items={[
                        { text: "Dashboard", url: "/v1/dashboard" },
                        { text: "Product Report", url: "" },
                    ]}
                />
            </Card>
            <Content />
        </>
    );
}

const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [state, setState] = useState<IOrder[]>([]);
    const [status, setStatus] = useState<string>("popular");

    useEffect(() => {
        oielly.order.list({
            status: status,
            range: {
                min: 0,
                max: 10
            },
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setState(success);
                setLoading(false);
            },
        });
    }, [status]);

    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Flexbox className={"mb-8"} justifyContent={'between'}>
                    <Cage>
                        <SearchField
                            placeholder={"Search"}
                            style={{ marginBottom: "0" }}
                            onValueChange={(e:any) => console.log(e)}
                        />
                    </Cage>
                    <Cage   >
                        <Option
                            item={["Popular", "Best of the week"]}
                            value={status}
                            onValueChange={(e: any) => setStatus(e.target.value)}
                        />
                    </Cage>
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
                    <Pagination length={50} url={"/v1/entries/guest"} align={"center"} />
                </Cage>
            </Card>
        </Cage>
    );
};


export default Product_Report;
