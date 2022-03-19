import { useState, useEffect } from "react";
import {
    Grid,
    Image,
    Breadcrumb,
    Button,
    Cage,
    Card, 
    Flexbox,
    Heading,
    Icon,
    Paragraph, 
    Spinner,
    SearchField
} from "@synevix/react-widget";
import classnames from "classnames";
import oielly from "@synevix/oielly-gateway";

import { IMarketMaterial } from "../../interface";
import { Link, useHistory } from "react-router-dom";
import * as css from "../../utility/styling"; 

const Market_List = () => {
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
                        <Button onClick={() => history.goBack()} icon={"icon-circle-left2"} className={css.iconStyling} style={{ color: '#000' }} />
                        <Heading
                            type={"H3"}
                            text={"Market Lists"}
                            className={css.pageTitle}
                            style={{ fontSize: "2rem" }}
                        />
                    </Cage>
                    <Link to={"/v1/market/material/add"} className={css.buttonLink}>
                        <Icon name={"icon-user-plus"} />
                    </Link>
                </Flexbox>

                <Breadcrumb
                    items={[
                        { text: "Dashboard", url: "/v1/dashboard" },
                        { text: "Market List", url: "" },
                    ]}
                />
            </Card>
            <Content />
        </>
    )
}

const Content = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [state, setState] = useState<IMarketMaterial[]>([]);

    useEffect(() => {
        oielly.market.list({
            response: (success: any, error: any) => {
                if (error) {
                    console.log(error);
                    return;
                }
                setState(success);
                setLoading(false);
            },
        });
    }, []);
    return (
        <Cage className={css.contentStyling}>
            <Card className={css.cardStyling}>
                <Flexbox className={"mb-8"}>
                    <Grid lg={"5"} className={"m-auto"}>
                        
                        <SearchField
                            placeholder={"Search"}
                            style={{ marginBottom: "0" }}
                            onValueChange={(e:any) => console.log(e)}
                        />
                    </Grid>
                </Flexbox>
                <Grid lg={"4"} gap={"3"} className={"mb-4"}>
                    {state.map((item, index: number) => (
                        <Card key={index} className={css.cardStyling}>
                            <Link to={`/v1/market/material/${item.referenceId}/profile`}>
                                <Image
                                    source={'https://res.cloudinary.com/dfsd5t9zt/image/upload/v1638576804/profile_images/noimage_dgiews.jpg'}
                                    alt={""}
                                    className={classnames(["m-auto", "w-1/2"])}
                                    style={{ borderRadius: "50%" }}
                                />
                                <Heading
                                    type={"H5"}
                                    text={item.marketName}
                                    className={"mt-5 text-center font-bold"}
                                />
                                <Paragraph text={item.location} className={"text-center"} />
                                <Paragraph text={item.marketId} className={"text-center"} />
                            </Link>
                        </Card>
                    ))}
                </Grid>
                {loading && <Spinner type={'circle'} />}
            </Card>
        </Cage>
    );
};

export default Market_List;

// {props.marketName.substring(0, 2)}
//         Market ID: ({props.marketId})
//         {props.Client.surname} {props.Client.otherName}
//         Client ID: ({props.clientId})

//         <h5 className="font-size-16 mb-0">{props.productCount}</h5>

//         <h5 className="font-size-16 mb-0">GHC {props.balance}</h5>
