import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import background from "../Images/pharmacy.jpg";
import logo from "../Images/logo.jpg";





export default function ReadBuy() {

    //class component waladi componentdidmount
    //session json with tocken
    const [readPrescription, setreadPrescription] = useState([]);
    const [date, setLabAppoinmentDate] = useState("");

    const [testType, setTestType] = useState("");
    const [testDate, setTestDate] = useState("");
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();

    const { name } = useParams();

    useEffect(function () {

        function getreadPrescriptions() {
            axios.get("https://backend-of-hms.onrender.com/pha/").then(function (res) {

                console.log(res.data);

                setreadPrescription(res.data);
                //alert(res.data[0].title)




            }).catch(function (err) {
                alert("data not fech" + err);
            })
        }
        getreadPrescriptions();

        handleFilterChange();




    }, [])

    const [src, setSrc] = useState([]);

    const imageSrc = (e) => {
        console.log(e.target.src);
        setSrc(e.target.src)
    }

    const downloadImage = () => {
        const link = document.createElement("a");
        link.download = `https://backend-of-hms.onrender.com/Prescriptions/${readPrescription.prescription}`;
        link.href = src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function handleFilterChange(e) {
        setFilter(name);
    }
    const filterName = readPrescription.filter((rep) => {
        return rep.name.toLowerCase().includes(filter.toLowerCase());

    })

    return (
        <div>

            <div>



                <div className="bg-1" style={{ height: "350px", background: '#0297BF', paddingTop: '40px' }}>
                    <div className="container text-center">
                        <h3 style={{ fontFamily: "inherit", color: "white" }}>MEDIXO E-HEALTH</h3>
                        <br />
                        <img src={logo} className="rounded-circle" alt="Bird" width="200" height="200" />
                        <h3></h3><br></br>
                    </div>
                </div>


            </div>
            <section style={{

                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                backgroundSize: 'cover',
                position: 'center',
                maxWidth: '100%',


            }}>

                <div style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <br />




                    <div className="">

                        <table className="table table-striped table-hover" id="myTable" style={{ color: "white" }}>
                            <thead style={{ color: "white" }}>
                                <tr>

                                    <th scope="col">order ID</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">E mail</th>
                                    <th scope="col">Telephone</th>
                                    <th scope="col">Town</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Prescription</th>
                                    <th scope="col" className="pr-3">Update</th>
                                    <th scope="col" className="pr-3">Delete</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: "white" }}>
                                {filterName.map((readPrescription) => (



                                    <tr>
                                        <td style={{ color: "white" }}>{readPrescription.orderID}</td>
                                        <td style={{ color: "white" }}>{readPrescription.title + " " + readPrescription.name}</td>
                                        <td style={{ color: "white" }}>{readPrescription.age}</td>
                                        <td style={{ color: "white" }}>{readPrescription.email}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.telephone}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.town}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.address}</td>
                                        <td className="tableTd" style={{ color: "white" }}>{readPrescription.status}</td>

                                        <td><button type="button" data-toggle="modal" data-target="#exampleModalCenter">

                                            <img
                                                id="myImg"
                                                height={"50px"}
                                                alt="Snow"
                                                width={"50px"}
                                                src={`https://backend-of-hms.onrender.com/Prescriptions/${readPrescription.prescription}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={imageSrc}

                                            />
                                        </button>

                                        </td>

                                        <td className="tableTd"><a href={'/updatePrescription/' + readPrescription._id}><button class="btn btn-sm text-white" style={{ background: "#26CDD1", width: "100px" }}>Update</button></a></td>
                                        <td className="tableTd"><a href={'/deletePrescription/' + readPrescription._id}><button class="btn btn-sm text-white" style={{ background: "#E53D3D", width: "100px" }}>Delete</button></a></td>

                                    </tr>

                                ))}

                            </tbody>


                        </table >
                    </div>



                </div >


                <div class="row d-flex justify-content-center">


                    <button type="submit" className="btn btn-success col-md-4 mt-0 mt-md-0" onClick={() => navigate("/readTotal/")} style={{backgroundColor:"#f0655b"}}>View Total & Pay</button><br />

                </div><br />


            </section >


        </div>
    )


}