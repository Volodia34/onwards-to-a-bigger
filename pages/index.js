//our-domain.com

import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from "next/head";
import {Fragment} from "react";




function HomePage(props) {

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of hinghly active React meetups' />
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//
//     return {
//         props: DUMMY_MEETUPS
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect("mongodb+srv://kisilvoloda04:zCEMSDuRuvhChSCw@cluster0.061qdih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    const db = client.db()

    const meetupsCollection = db.collection("meetups");

    const meetups =await meetupsCollection.find().toArray()

    client.close()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}


export default HomePage