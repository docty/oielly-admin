import { useEffect, useRef, useState } from "react";
import {
	Option,
	Image,
	Card,
	Flexbox,
	Cage,
	Button,
	Heading,
	Icon,
	Breadcrumb,
	Paragraph,
	Tab,
	TabItem,
	TextField,
	Grid,
} from "@synevix/react-widget";
import { Link, useHistory, useParams } from "react-router-dom";
import oielly from "@synevix/oielly-gateway";
import classnames from "classnames";

import * as css from "../../utility/styling";
import { IClient, IResponse } from "../../interface";
import { CLIENT_UPLOAD } from "../../utility/constant";
import ImageUpload from "../../components/ImageUpload";
import imag from "../../assets/images/users/avatar-1.jpg";
import { Toast } from "../../components/Toast";

const Client_Profile = () => {
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
						<Button
							onClick={() => history.goBack()}
							icon={"icon-circle-left2"}
							className={css.iconStyling}
							style={{ color: "#000" }}
						/>
						<Heading
							type={"H3"}
							text={"Client Profile"}
							className={css.pageTitle}
							style={{ fontSize: "2rem" }}
						/>
					</Cage>
					<Link to={"/v1/entries/client/list"} className={css.buttonLink}>
						<Icon name={"icon-list"} />
					</Link>
				</Flexbox>

				<Breadcrumb
					items={[
						{ text: "Dashboard", url: "/v1/dashboard" },
						{ text: "Client", url: "/v1/entries/client/list" },
						{ text: "Profile", url: "" },
					]}
				/>
			</Card>
			<Content />
		</>
	);
};

const Content = () => {
	const [state, setState] = useState<IClient>({} as IClient);
	const params = useParams<any>();

	useEffect(() => {
		oielly.client.profile({
			referenceId: params.referencing,
			response: (success: any, error: any) => {
				if (error) {
					console.log(error);
					return;
				}
				setState(success);
			},
		});
	}, [params.referencing]);
	return (
		<Cage className={css.contentStyling}>
			<Card className={css.cardStyling}>
				<Grid lg={"3"} gap={"3"} className={"mb-5"}>
					<LeftPane {...state} />
					<MiddlePane {...state} />
					<RightPane {...state} />
				</Grid>
				<Information {...state} />
			</Card>
		</Cage>
	);
};

const LeftPane = (props: IClient) => {
	return (
		<Card className={css.cardStyling}>
			<Cage>
				<Image
					source={imag}
					alt={""}
					className={classnames(["m-auto", "w-1/2"])}
					style={{ borderRadius: "50%" }}
				/>
				<Heading
					type={"H4"}
					text={`${props.surname} ${props.otherName}`}
					className={"mt-5 text-center font-bold"}
				/>
				<Paragraph
					text={"#" + props.clientId}
					className={"text-center text-italic"}
				/>
			</Cage>
		</Card>
	);
};

const MiddlePane = (props: IClient) => {
	return (
		<Card className={css.cardStyling}>
			<Heading className={css.profileCardTitle} type={"H3"} text={"Personal"} />
			<Grid md={"2"} style={{ gridAutoRows: "40px" }}>
				<Paragraph text={"Full Name :"} className={"font-bold"} />
				<Paragraph text={`${props.surname} ${props.otherName}`} />
				<Paragraph text={"Client Id:"} className={"font-bold"} />
				<Paragraph text={"#" + props.clientId} />
				<Paragraph text={"Email:"} className={"font-bold"} />
				<Paragraph text={props.email} />
				<Paragraph text={"Contact:"} className={"font-bold"} />
				<Paragraph text={props.contact} />
				<Paragraph text={"Gender:"} className={"font-bold"} />
				<Paragraph text={props.gender} className={'capitalize'} />
			</Grid>
		</Card>
	);
};

const RightPane = (props: IClient) => {
	return (
		<Card className={css.cardStyling}>
			<Heading className={css.profileCardTitle} type={"H3"} text={"Account"} />
			<Grid md={"2"} style={{ gridAutoRows: "40px" }}>
				<Paragraph text={"Bank Name :"} className={"font-bold"} />
				<Paragraph text={"Access Bank"} />
				<Paragraph text={"Account Number :"} className={"font-bold"} />
				<Paragraph text={"0065321065498646"} />
				<Paragraph text={"Branch:"} className={"font-bold"} />
				<Paragraph text={"Adum"} />
			</Grid>
		</Card>
	);
};
const Information = (props: IClient) => {
	return (
		<Tab direction={"col"}>
			<TabItem text={"Personal"}>
				<Personal {...props} />
			</TabItem>
			<TabItem text={"Account"}>
				<Account {...props} />
			</TabItem>
			<TabItem text={"Upload"}>
				<UploadProfile referenceId={props.referenceId} />
			</TabItem>
		</Tab>
	);
};
const Personal = (props: IClient) => {
	const [state, setState] = useState<IClient>(props);
	const [loading, setLoading] = useState<boolean>(false);
	const toastRef = useRef<HTMLDivElement>(null);
	const [response, setResponse] = useState<IResponse>({} as IResponse);

	useEffect(() => {
		setState(props);
	}, [props]);

	const updatePersonal = () => {
		setLoading(true);

		oielly.client.update({
			referenceId: state.referenceId,
			data: { ...state },
			response: (success: any, error: any) => {
				toastRef.current!.style.display = 'flex'
				setLoading(false);
				if (error) {
					setResponse({ text: error.toString(), color: 'red', icon: 'icon-notification2' })
					return
				}
				setResponse({ text: success.message.toString(), color: 'green', icon: 'icon-info3' });

			}
		})

	};

	return (
		<Card className={css.cardStyling}>
			<Grid gap={'4'} className={'w-1/2 mx-auto'}>
				<TextField
					value={state.surname}
					placeholder={"Enter Surname"}
					onValueChange={(e) => setState({ ...state, surname: e.target.value })}
				/>
				<TextField
					value={state.otherName}
					placeholder={"Enter Other Name"}
					onValueChange={(e) => setState({ ...state, otherName: e.target.value })}
				/>
				<TextField
					value={state.email}
					type={"email"}
					placeholder={"Enter Email"}
					onValueChange={(e) => setState({ ...state, email: e.target.value })}
				/>
				<TextField
					value={state.contact}
					type={"tel"}
					placeholder={"Enter Contact"}
					onValueChange={(e) => setState({ ...state, contact: e.target.value })}
				/>

				<Option
					value={state.gender}
					item={["Male", "Female"]}
					onValueChange={(e: any) =>
						setState({ ...state, gender: e.target.value })
					}
				/>
				<Button
					text={"UPDATE"}
					className={css.formButton}
					onClick={updatePersonal}
					isLoading={loading}
				/>
				<Toast {...response} refer={toastRef} className={'hidden'} />
			</Grid>
		</Card>
	);
};

const Account = (props: IClient) => {
	const [state, setState] = useState<IClient>(props);
	const [loading, setLoading] = useState<boolean>(false);
	const toastRef = useRef<HTMLDivElement>(null);
	const [response, setResponse] = useState<IResponse>({} as IResponse);


	useEffect(() => {
		setState(props);
	}, [props]);

	const updateAccount = () => {
		setLoading(true);

		oielly.client.update({
			referenceId: state.referenceId,
			data: { ...state },
			response: (success: any, error: any) => {
				toastRef.current!.style.display = 'flex'
				setLoading(false);
				if (error) {
					setResponse({ text: error.toString(), color: 'red', icon: 'icon-notification2' })
					return
				}
				setResponse({ text: success.message.toString(), color: 'green', icon: 'icon-info3' });

			}
		})
	};
	return (
		<Card className={css.cardStyling}>
			<Grid gap={'4'} className={'w-1/2 mx-auto'}>
				<TextField
					value={state.bankName}
					placeholder={"Enter Bank Name"}
					onValueChange={(e) => setState({ ...state, bankName: e.target.value })}
				/>
				<TextField
					value={state.bankBranch}
					placeholder={"Enter Branch"}
					onValueChange={(e) =>
						setState({ ...state, bankBranch: e.target.value })
					}
				/>
				<TextField
					value={state.accountNumber}
					type={"email"}
					placeholder={"Enter Account Number"}
					onValueChange={(e) =>
						setState({ ...state, accountNumber: e.target.value })
					}
				/>

				<Button
					text={"UPDATE"}
					className={css.formButton}
					onClick={updateAccount}
					isLoading={loading}
				/>
				<Toast {...response} refer={toastRef} className={'hidden'} />
			</Grid>
		</Card>
	);
};

const UploadProfile = ({ referenceId }: { referenceId: string }) => {
	const uploadImage = async (e: any) => {
		const formData = new FormData();
		formData.append("personal", e[0]);
		formData.append("name", referenceId);
		const requestOptions = {
			method: "POST",
			body: formData,
		} as RequestInit;

		await fetch(CLIENT_UPLOAD, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (!result.ok) {
					return Promise.reject(result);
				}
				console.log(result);
			})
			.catch((error) => console.log(error));
	};
	return <ImageUpload onSubmit={uploadImage} />;
};

export default Client_Profile;
