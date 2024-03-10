import React, { useState, useRef , useEffect} from 'react';
import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import * as Sentry from "@sentry/react";

import FormTim from './FormTim';
import FormPeserta from './FormPeserta';
import FormGuru from './FormGuru';
import postData from './PostData';
import ButtonAlert from './ButtonAlert';

const Registrasi = ({compe}) => {
    let navigate = useNavigate();
    //console.log(compe);

    // Set initial value for custom fields in team
    let initialCustomFieldsTeam = {};
    compe.custom_field.filter(x => x.field_level === 'TE').forEach((val) => {
        initialCustomFieldsTeam[val.id] = "";

        // Set value with default first choice
        let choices = val.choices.split('$');
        if (choices.length > 0) {
            initialCustomFieldsTeam[val.id] = choices[0].trim();
        }
    })

    // Set initial value for custom fields in participant
    let initialCustomFieldsPersonal = {};
    compe.custom_field.filter(x => x.field_level === 'PA').forEach((val) => {
        initialCustomFieldsPersonal[val.id] = "";

        // Set value with default first choice
        let choices = val.choices.split('$');
        if (choices.length > 0) {
            initialCustomFieldsPersonal[val.id] = choices[0].trim();
        }
    })
    
    const SUPPORTED_FORMATS = ['application/pdf','image/jpg','image/jpeg','image/png'];
    
    const regisFormRef = useRef(null);
    const [errorSubmit, setErrorSubmit] = useState([]);
    const [numPeserta, setNumPeserta] = useState(1);
    const fee_type = compe.fee_type === "TF" ? true : false; 
    // Make fee_type value true when fee_type is teamform, and false when it is personForm
    const School_type = compe.School_type === "TS" ? true : false; 
    // console.log(fee_type)
    // console.log(School_type)
    // const initializeDataPeserta = {nama_peserta:'',nama_sekolah_peserta:'', no_telp_peserta:'', email_peserta:'', ultah:'', umur:'', pas_foto:'', bukti_identitas:'', akte_lahir:'', Foto_Jersey_Terang:'', Foto_Jersey_Gelap:'', izin:'', resiko:'', 
    //     No:compe.Nomor_Peserta, Akte_Lahir:compe.Akte_Lahir, Pas_Foto:compe.Pas_Foto, Identitas:compe.Identitas, Jersey_Terang:compe.Foto_Jersey_Terang, Jersey_Gelap: compe.Foto_Jersey_Gelap ,Izin:compe.Surat_Izin_Orangtua, Resiko:compe.Surat_Penanggung_Resiko,School_type:School_type, fee_type:fee_type,  customFields: initialCustomFieldsPersonal};
    const initializeDataPeserta = {nama_peserta:'',nama_sekolah_peserta:'', no_telp_peserta:'', email_peserta:'', ultah:'', umur:'', pas_foto:'', bukti_identitas:'', akte_lahir:'', izin:'', resiko:'', 
        No:compe.Nomor_Peserta, Akte_Lahir:compe.Akte_Lahir, Pas_Foto:compe.Pas_Foto, Identitas:compe.Identitas,Izin:compe.Surat_Izin_Orangtua, Resiko:compe.Surat_Penanggung_Resiko,School_type:School_type, fee_type:fee_type,  customFields: initialCustomFieldsPersonal};

    const tambahPeserta = (values, setValues) => {
        const dataPeserta = [...values.dataPeserta];
        let tim_size = values.tim_size;

        if (numPeserta+1 <= compe.Maximum_Team_Size) {
            tim_size = tim_size + 1;
            setNumPeserta(numPeserta + 1); 
            dataPeserta.push(initializeDataPeserta);
            setValues({ ...values, tim_size, dataPeserta }, true);
        }
    }

    const renderPeserta = (values, handleChange, handleBlur, setFieldValue, setFieldTouched) => { 
        let arrPeserta = []; 
        for (var i=2; i<=numPeserta; i++) {
            arrPeserta.push(<FormPeserta key={i} numPeserta={i} compe={compe} values={values} handleChange={handleChange} handleBlur={handleBlur} setFieldValue={setFieldValue} onFileUpload={onFileUpload} setFieldTouched={setFieldTouched}/>)
        }
        return arrPeserta;
    }  
    const onFileUpload = (field, value, setFieldValue, setFieldTouched) => {    
        if (typeof(value) === 'undefined') return; //kl cancel pas ambil data
        
        let reader = new FileReader();
        reader.readAsArrayBuffer(value); 
        reader.onloadend = () => {
            setFieldTouched(field, true);
            setFieldValue(field, {blob: reader.result, name:value.name, size:value.size, type:value.type}, true);
        };
    }
    const validationSchema = Yup.object().shape({ 
        No:Yup.boolean(), Pas_Foto : Yup.boolean(), Identitas: Yup.boolean(), Akte_Lahir : Yup.boolean(), Surat_Sekolah : Yup.boolean(), Izin:Yup.boolean(), Resiko:Yup.boolean(),
        Teacher_Number : Yup.boolean(), Teacher_Photo : Yup.boolean(), fee_type: Yup.boolean(), School_type: Yup.boolean(),Teacher: Yup.boolean(),
        
        // No:Yup.boolean(), Pas_Foto : Yup.boolean(), Identitas: Yup.boolean(), Akte_Lahir : Yup.boolean(), Surat_Sekolah : Yup.boolean(), Jersey_Terang:Yup.boolean(),Jersey_Gelap:Yup.boolean(), Izin:Yup.boolean(), Resiko:Yup.boolean(),
        // Teacher_Number : Yup.boolean(), Teacher_Photo : Yup.boolean(), fee_type: Yup.boolean(), School_type: Yup.boolean(),Teacher: Yup.boolean(),
        
        
        dataPeserta: Yup.array().of(
            Yup.object().shape({
                nama_peserta: Yup.string().trim().required("Required"),
                nama_sekolah_peserta: Yup.mixed().when('School_type', {is:false, then: Yup.string().trim().required("Required"), otherwise: Yup.mixed().notRequired()}), //only PS
                no_telp_peserta: Yup.mixed().when('No', {is:true, then: Yup.number().typeError('Must be a number').required("Required"), otherwise: Yup.mixed().notRequired()}), 
                email_peserta: Yup.mixed().when("fee_type", {is: true, then: Yup.string().trim().email("Email must be a valid email").required("Required"), otherwise: Yup.mixed().notRequired()}), //only TF
                ultah: Yup.mixed().required("Required"),
                umur: Yup.number("Must be a number").min(compe.Minimum_Age, `Must be above ${compe.Minimum_Age}`).max(compe.Maximum_Age, `Must be below ${compe.Maximum_Age}`).required("Required"),

                pas_foto    : Yup.mixed().when('Pas_Foto', {is: true, then: Yup.mixed().required("Required")
                    .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
                    .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
                    otherwise: Yup.mixed().notRequired()}),
                bukti_identitas: Yup.mixed().when('Identitas', {is: true, then: Yup.mixed().required("Required")
                    .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
                    .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
                    otherwise: Yup.mixed().notRequired()}),  
                akte_lahir  : Yup.mixed().when('Akte_Lahir', {is: true, then: Yup.mixed().required("Required")
                    .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
                    .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
                    otherwise: Yup.mixed().notRequired()}),
                // Foto_Jersey_Terang  : Yup.mixed().when('Foto_Jersey_Terang', {is: true, then: Yup.mixed().required("Required")
                //     .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
                //     .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
                //     otherwise: Yup.mixed().notRequired()}),
                // Foto_Jersey_Gelap  : Yup.mixed().when('Foto_Jersey_Gelap', {is: true, then: Yup.mixed().required("Required")
                //     .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
                //     .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
                //     otherwise: Yup.mixed().notRequired()}),
                izin    : Yup.mixed().when('Izin', {is: true, then: Yup.mixed().required("Required")
                    .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
                    .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
                    otherwise: Yup.mixed().notRequired()}),
                /*resiko    : Yup.mixed().when('Resiko', {is: true, then: Yup.mixed().required("Required")
                    .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
                    .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
                    otherwise: Yup.mixed().notRequired()}),*/
            })
        ),
        nama_tim: Yup.mixed().when("fee_type", {is: true, then:Yup.string().trim().required("Required"), otherwise: Yup.mixed().notRequired()}),//Only TF
        nama_sekolah: Yup.mixed().when("School_type", {is: true, then:Yup.string().trim().required("Required"), otherwise: Yup.mixed().notRequired()}), //Only TS
        email_tim: Yup.string().trim().email("Email must be a valid email").required("Required"),
        nomor_rek: Yup.string().trim().required("Required"),
        surat_sekolah: Yup.mixed().when('Surat_Sekolah', {is: true, then: Yup.mixed().required("Required")
            .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
            .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
            otherwise: Yup.mixed().notRequired()}),
            
        nama_pendamping: Yup.mixed().when("Teacher", {is: true, then: Yup.string().trim().required("Required"), otherwise: Yup.mixed().notRequired()}),
        no_telp_guru : Yup.mixed().when('Teacher_Number', {is: true, then: Yup.number().typeError('Must be a number').required("Required"), otherwise: Yup.mixed().notRequired()}),
        email_guru : Yup.mixed().when('Teacher_Number', {is: true, then: Yup.string().trim().email("Email must be a valid email").required("Required"), otherwise: Yup.mixed().notRequired()}),
        foto_pendamping: Yup.mixed().when("Teacher_Photo", {is: true, then: Yup.mixed().nullable().required("Required")
            .test("format", "Must be a pdf/jpg/jpeg/png file", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)))
            .test("size", "Must be less than 3 MB", (value) => !value || (value && value.size <= 3*1024*1024)),
            otherwise: Yup.mixed().notRequired()}),
        
        tim_size: Yup.number().min(compe.Minimum_Team_Size, `Team size must be above ${compe.Minimum_Team_Size}`)
    });

    return(
        <Formik 
            validationSchema={validationSchema}
            validateOnChange={true}
            initialStatus={{isValidating: false}}
            initialValues={{lomba: compe.id, nama_tim:'', nama_sekolah:'', email_tim:'', nomor_rek:'', surat_sekolah:'',  nama_pendamping:'', no_telp_guru:'', email_guru:'', foto_pendamping:'',
                Surat_Sekolah:compe.Surat_Sekolah, Teacher_Number:compe.Teacher_Number, Teacher_Photo:compe.Teacher_Photo, tim_size:1, fee_type:fee_type, School_type:School_type, Teacher:compe.Teacher,
                dataPeserta:[initializeDataPeserta], customFields: initialCustomFieldsTeam}}
            onSubmit={(values, {setSubmitting, setStatus}) => { 
                //console.log(values);
                setStatus({isValidating: true});
                setTimeout(()=> {
                    postData(values, navigate).then(()=>{
                        setSubmitting(false);
                        setStatus({isValidating: false});
                    }).catch((error)=> {
                        Sentry.captureException(error);
                        setSubmitting(false);
                        setStatus({isValidating: false});
                        if (error.response?.data?.error) {
                            setErrorSubmit(error.response.data.error);
                        } else {
                            setErrorSubmit(["Terjadi kesalahan pada sistem. Silahkan coba beberapa saat lagi atau hubungi tim kami"]);
                        }
                        regisFormRef.current.scrollIntoView();
                    })
                }, 400);
            }}
        >
            {({
                handleChange, handleBlur, handleSubmit, isSubmitting, values, setValues, setFieldValue, setFieldTouched
            }) => (
                <div className="mx-5 py-5 lg:mx-20" ref={regisFormRef}>
                    {errorSubmit.map((val, i) => (
                        <div className={"bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"} role="alert">
                            <div className={"flex"}>
                            <div className={"py-1"}><svg className={"fill-current h-6 w-6 text-red-500 mr-4"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                            <div>
                                <p className={"font-bold"}>Error</p>
                                <p className={"text-sm"}>{val}</p>
                            </div>
                            </div>
                        </div>
                    ))}

                    <form onSubmit={handleSubmit}>
                       
                        <FormTim compe={compe} numPeserta={1} values={values} handleChange={handleChange} handleBlur={handleBlur} setFieldValue={setFieldValue} onFileUpload={onFileUpload} setFieldTouched={setFieldTouched}/>
                        <FormGuru compe={compe} values={values} handleChange={handleChange} handleBlur={handleBlur} setFieldValue={setFieldValue} onFileUpload={onFileUpload} setFieldTouched={setFieldTouched}/>
                        <FormPeserta numPeserta={1} compe={compe} values={values} handleChange={handleChange} handleBlur={handleBlur} setFieldValue={setFieldValue} onFileUpload={onFileUpload} setFieldTouched={setFieldTouched}/>
                        
                        {renderPeserta(values, handleChange, handleBlur, setFieldValue, setFieldTouched)}
                        
                        {isSubmitting && <ButtonAlert/>}
                        <div className="font-plusjakartasans">
                            <div>
                                <div className={`flex gap-2 border border-white justify-center rounded-xl HOVER-GLOW HOVER-GLOW w-full md:px-4 md:py-2 xl:px-7 xl:py-[0.7rem] text-xl mb-5
                                    ${values.tim_size === compe.Maximum_Team_Size ? `hidden` : `block`}`} onClick={() => tambahPeserta(values, setValues, setFieldValue)}>
                                    <button type="button" className="mt-[0.2rem] text-slate-100">+ Tambah Peserta</button>
                                </div>
                                <div className="mx-3 text-red-500"> 
                                    <ErrorMessage name="tim_size"/>
                                </div>
                            </div>

                            <div className="">
                                <button type="submit" disabled={isSubmitting} 
                                    className={`flex gap-2 bg-[#b084fc] rounded-xl justify-center HOVER-GLOW HOVER-GLOW  w-full md:px-4 md:py-2 xl:px-7 xl:py-[0.7rem] text-xl mb-10 ${isSubmitting && 'cursor-default'}`}>
                                    {isSubmitting && <div className={"lds-dual-ring"}></div>}
                                    <span className="mt-[0.2rem] text-slate-100 text-center">Daftar</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
         
    )
};
export default Registrasi;