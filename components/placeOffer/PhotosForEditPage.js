import {useState, useRef, useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import { STATIC_URL } from "#lib/constants";
// import {arrayMoveImmutable} from 'array-move';

const useStyles = makeStyles((theme) => ({
    formElem: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(3),
    },
    formTitleField: {
        fontSize: "14px",
        flexGrow: 1,
        padding: "4px 0",
    },
    formInputField: {
        width: "490px",
        height: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        cursor: "pointer",
        "&>*": {
            margin: "5px",
        },
    },
    card: {
        position: "relative",
        width: "112px",
        minWidth: "112px",
        maxWidth: "112px",
        height: "130px",
        minHeight: "130px",
        maxHeight: "130px",
        background: "no-repeat url(../../icons/photocard_placeholder.svg), #E9E9E9",
        backgroundSize: "contain",
        backgroundPosition: "top 30px",
        borderRadius: "1px",
        overflow: "hidden",
        "& img": {
            position: "absolute",
            zIndex: 5,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: "100%",
            minWidth: "100%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            overflow: "hidden",
            borderRadius: "1px",
            transition: "all 350ms ease-in-out",
        },
    },
    rotate: {
        display: "block",
        position: "absolute",
        zIndex: 7,
        top: 0,
        left: 0,
        width: "24px",
        height: "24px",
        background: "no-repeat center center url(../../icons/rotate_o_light.svg)",
        transition: "all 350ms ease-in-out",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            transform: "rotate(90deg)",
            cursor: "pointer",
        },
    },
    delete: {
        display: "block",
        position: "absolute",
        zIndex: 7,
        top: 0,
        right: 0,
        width: "24px",
        height: "24px",
        background: "no-repeat center center url(../../icons/cross_o_light.svg)",
        transition: "all 350ms ease-in-out",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            transform: "scale(0.8)",
            cursor: "pointer",
        },
    },
    mainPhoto: {
        display: "block",
        width: "100%",
        padding: "3px 0",
        position: "absolute",
        zIndex: 9,
        bottom: 0,
        textAlign: "center",
        background: "rgba(44, 44, 44, 0.37)",
        borderRadius: "1px",
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: 400,
    },
    makeMainWrapper: {
        width: "100%",
        height: "100%",
        position: "relative",
        zIndex: 5,
        opacity: 0,
        transition: "all 350ms ease-in-out",
        "&:hover": {
            transition: "all 350ms ease-in-out",
            opacity: 1,
        },
    },
    makeMain: {
        display: "block",
        width: "100%",
        padding: "3px 0",
        position: "absolute",
        zIndex: 4,
        bottom: 0,
        textAlign: "center",
        background: "rgba(44, 44, 44, 0.37)",
        borderRadius: "1px",
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: 400,
    },
    notif: {
        position: "absolute",
        zIndex: 2,
        top: "78px",
        color: "#c7c7c7",
        fontSize: "12px",
        textAlign: "center",
    },
    fi: {
        display: "none",
    },
    error: {
        width: "100%",
        paddingLeft: theme.spacing(1),
        color: theme.palette.error.main,
        fontSize: "12px",
    },
    drag: {
        display: "flex",
        flexWrap: "wrap",
        margin: 0,
        overflow: "hidden",
        "&>div": {
            marginRight: "10px",
            marginBottom: "10px",
        },
    },
}));

const PhotoForEditPage = ({ctx, photo}) => {

    const classes = useStyles();
    const methods = useFormContext();
    const fileInputRef = useRef();
    const [oldPhotosAndNewObjectsPhotos, setOldPhotosAndNewObjectsPhotos] = useState([]);
    const stringPhotos = photo
    const [oldPhotos, setOldPhotos] = useState([])
    const [validFiles, setValidFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [imageData, setImageData] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(
        "???????????????? ?????? ???????????????????? ????????"
    );

    function arrayMoveMutable(array, fromIndex, toIndex) {
        const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

        if (startIndex >= 0 && startIndex < array.length) {
            const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

            const [item] = array.splice(fromIndex, 1);
            array.splice(endIndex, 0, item);
        }
    }

    function arrayMoveImmutable(array, fromIndex, toIndex) {
        array = [...array];
        arrayMoveMutable(array, fromIndex, toIndex);
        return array;
    }


    useEffect(() => {
         setOldPhotos(stringPhotos.map((item) => ({angle: 0, src: item, name: item, old: true})))
    }, []);





    useEffect(() => {
        //
        setOldPhotosAndNewObjectsPhotos([...oldPhotosAndNewObjectsPhotos, ...oldPhotos])
    }, [oldPhotos]);

    useEffect(() => {
        if (!validFiles.find((el) => el.name === selectedFiles.name)) {
            if (selectedFiles && validFiles.length < 20) {
                setValidFiles([...validFiles, selectedFiles]);
            }
        }

    }, [selectedFiles]);


    useEffect(() => {
        //

        // val = [2,3,4,5] old = [1,2,3] new = [123 45]
        // val = [2,3,5] old = [1,2,3,4,5] new = [1,2,3,4,5 ]
        const commonArr = [...oldPhotosAndNewObjectsPhotos, ...validFiles.filter(item => oldPhotosAndNewObjectsPhotos.indexOf(item) === -1)].slice(0, 20)
        // setOldPhotosAndNewObjectsPhotos([...oldPhotosAndNewObjectsPhotos, ...validFiles.filter(item => oldPhotosAndNewObjectsPhotos.indexOf(item) === -1)])
        setOldPhotosAndNewObjectsPhotos(commonArr)
    }, [validFiles])

    useEffect(() => {
        // ???? ???????????????? ?????????? ????????????. ?????? ???? ?????????????????? ???? ???????????????? ???????????????????????????? - ???? ??????????????.

        // if (validFiles && validFiles.length > 0) {
        //     methods.setValue("photoes", "ok");
        // } else {
        //     console.log('if photo errors')
        //     methods.setValue("photoes", "");
        // }
        methods.clearErrors('photoes')
        validFiles.forEach((el, i) => {
            const reader = new FileReader();
            reader.readAsDataURL(el);
            reader.onloadend = (e) => {
                setImageData(img => {
                    if (img.length === 0 || img.find(im => im.name === el.name) === undefined) {
                        return [...img, {name: el.name, src: e.target.result, id: i}]
                    }
                    return [...img]
                });
            };
        });
    }, [validFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
    };
    const dragOver = (e) => {
        preventDefault(e);
        setErrorMessage("?????????????????? ???????? ???????? ????????");
    };
    const dragEnter = (e) => {
        preventDefault(e);
    };
    const dragLeave = (e) => {
        preventDefault(e);
        setErrorMessage("???????????????? ?????? ???????????????????? ????????");
    };
    const even = (num) => {
        if (num % 2 === 0) {
            return true;
        } else {
            return false;
        }
    };
    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    };
    const filesSelected = () => {
        if(oldPhotosAndNewObjectsPhotos.length >= 20) {
            methods.setError("photoes", {
                type: "string",
                message: "???? ?????????????????? ?????????????????? ?????????? 20 ????????????????????",
              })
              return
        }
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    };
    const fileInputClicked = () => {
        fileInputRef.current.click();
    };

    const handleFiles = (files) => {
        if(oldPhotosAndNewObjectsPhotos.length >= 20) {
            return
        }
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = () => {
                        const elem = document.createElement("canvas");
                        if (img.width >= img.height) {
                            elem.width = 1200;
                            elem.height = img.height * (1200 / img.width);
                        } else {
                            elem.height = 1200;
                            elem.width = img.width * (1200 / img.height);
                        }

                        const ctx = elem.getContext("2d");
                        ctx.drawImage(img, 0, 0, elem.width, elem.height);
                        ctx.canvas.toBlob(
                            (blob) => {
                                const file = new File([blob], files[i].name, {
                                    type: "image/webp",
                                    lastModified: Date.now(),
                                });
                                setSelectedFiles(file);
                            },
                            "image/webp",
                            0.7
                        );
                    };
                };

                setErrorMessage("???????????????? ?????? ???????????????????? ????????");
            } else {
                files[i]["invalid"] = true;
                // setSelectedFiles(files[i]);
                setErrorMessage("?????????????????? ???????????? ????????????, ???????????????? jpg ?????? png");
                setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
            }
        }
    };

    const validateFile = (file) => {
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        // ???????? ?? ?????????? ?????? ???? ?????????????????????????? ???? ???????????? ???????? ???? ?????????????? ???????????? ????????
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    };


    const removeFile = (name) => {

        const index = validFiles.findIndex((e) => e.name === name);
        const index3 = unsupportedFiles.findIndex((e) => e.name === name);
        const index4 = oldPhotosAndNewObjectsPhotos.findIndex((e) => e.name === name);
        validFiles.splice(index, 1);
        setValidFiles([...validFiles]);
        oldPhotosAndNewObjectsPhotos.splice(index4, 1);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
    };



    const removeSrc = (data) => {

        setOldPhotosAndNewObjectsPhotos([...oldPhotosAndNewObjectsPhotos.filter((item) => {

            return item.src !== data
        })])
    }

    const rotate = (data) => {
        const filteredValid = !data.old ? validFiles : oldPhotos
        const index = filteredValid.indexOf(data);
        if (!filteredValid[index].angle) {
            filteredValid[index].angle = 0;
        }
        filteredValid[index].angle += 90;
        if (filteredValid[index].angle === 360) {
            filteredValid[index].angle = 0;
        }
        !data.old ? setValidFiles([...filteredValid]) : setOldPhotos([...filteredValid]);
    };

    ctx(oldPhotosAndNewObjectsPhotos);

    const SortableList = SortableContainer(({items}) => {


            return (
                <div className={classes.drag}>
                    {items.map((value, i) => (
                        <SortableItem key={i} index={i} data={value} i={i}/>
                    ))}
                    <div
                        className={classes.card}
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                        onClick={fileInputClicked}
                    >
                        <div className={classes.notif}>{errorMessage}</div>
                        <input

                            {
                                ...methods.register("photoes", {

                                })
                            }

                            ref={fileInputRef}
                            className={classes.fi}
                            type="file"
                            multiple
                            onChange={filesSelected}
                        />
                    </div>
                </div>
            );

    });



        const SortableItem = SortableElement(({data, i}) => {
            const img = imageData.find((el) => el.name === data.name);

            return (
                <div
                    style={{marginRight: "5px", userSelect: "none"}}
                    className={classes.card}
                >
                    <img
                        alt="img"
                        src={!data.old ? `${img?.src}` : `${STATIC_URL}/${data.src}`}
                        id={!data.old ? `prev${img?.id}` : i}
                        style={{
                            transform: data.angle
                                ? `rotate(${data.angle}deg) ${!even(data.angle / 90) ? "scale(1.2)" : "scale(1)"
                                }`
                                : null,
                        }}
                    />
                    <div
                        className={classes.rotate}
                        onClick={() => rotate(data)}
                    />
                    <div
                        className={classes.delete}
                        onClick={() => !data.old ? removeFile(img?.name) : removeSrc(data.name)}
                    />
                    {i === 0 && (
                        <div className={classes.mainPhoto}>?????????????? ????????</div>
                    )}
                </div>
            );
        });

        const onSortEnd = ({oldIndex, newIndex}) => {
            const items = arrayMoveImmutable(oldPhotosAndNewObjectsPhotos, oldIndex, newIndex)
            setOldPhotosAndNewObjectsPhotos([...items])
        }

        return (
            <Box className={classes.formElem}>
                <Typography className={classes.formTitleField}>????????????????????</Typography>
                <Box className={classes.formInputField}>
                    <div>
                        <SortableList items={oldPhotosAndNewObjectsPhotos} axis="xy" onSortEnd={onSortEnd}
                                      distance={5}/>
                    </div>
                    <Typography className={classes.error}
                                style={{color: methods.formState.errors?.photoes?.message ? null : '#C7C7C7'}}>
                        {methods.formState.errors?.photoes?.message || '???? 20 ???????????????????? ?? ?????????????? JPG ?????? PNG. ???????????? ???????? - ???? 25MB'}
                    </Typography>
                </Box>
            </Box>
        );
    };

    export default PhotoForEditPage;
