import {Button, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import {createLesson} from "@/api/data/index.js";
import styles from "@/pages/Home/components/ModalCreateSkill/styles.module.scss";
import InputForm from "@/components/InputForm/index.jsx";
import _ from 'lodash'
import ErrorMessage from "@/components/ErrorMessage/index.jsx";
import InputUpload from "@/components/InputUpload/index.jsx";
import {getNotification} from "@/utils/helper.js";

export function ModalCreateLesson (props) {
    const {
        skillId, visibleCreateLesson, topics,
        setVisibleCreateLesson, handleSuccessCreateLesson
    } = props

    const [dataLesson, setDataLesson] = useState({
        name: '',
        topic_id: null,
        thumbnail: '',
        questions_to_draw: 5,
        completion_xp: 50,
    })
    const [errorDataLesson, setErrorDataLesson] = useState({
        name: '',
        topic_id: '',
        thumbnail: '',
        questions_to_draw: '',
        completion_xp: '',
    })

    useEffect(() => {
        if (!visibleCreateLesson) {
            setDataLesson({
                name: '',
                topic_id: null,
                thumbnail: '',
                questions_to_draw: 5,
                completion_xp: 50,
            })

            setErrorDataLesson({
                name: '',
                topic_id: '',
                thumbnail: '',
                questions_to_draw: '',
                completion_xp: '',
            })
        }
    }, [visibleCreateLesson])

    const handleChangeData = (type, value) => {
        const newData = _.cloneDeep(dataLesson)
        newData[type] = value
        setDataLesson(newData)
    }

    const handleCreateLesson = () => {
        const formData = new FormData()

        formData.append('name', dataLesson.name)
        formData.append('topic_id', dataLesson.topic_id)
        formData.append('thumbnail', dataLesson.thumbnail)
        formData.append('questions_to_draw', dataLesson.questions_to_draw)
        formData.append('completion_xp', dataLesson.completion_xp)

        createLesson(skillId, formData).then((res) => {
            handleSuccessCreateLesson()
            getNotification('success', 'Tạo buổi học thành công.')
        }).catch((error) => {
            if (error.response.data.status === 400) {
                setErrorDataLesson({
                    name: error.response.data.detail.name,
                    topic_id: error.response.data.detail.topic_id,
                    thumbnail: error.response.data.detail.thumbnail,
                    questions_to_draw: error.response.data.detail.questions_to_draw,
                    completion_xp: error.response.data.detail.completion_xp,
                })
            } else {
                setErrorDataLesson(error.response.data.message)
            }
        })
    }

    return (
        <Modal
            className={`general-dialog-wrap`}
            closable={false}
            footer={false}
            open={visibleCreateLesson}
            onOk={() => setVisibleCreateLesson(!visibleCreateLesson)}
            onCancel={() => setVisibleCreateLesson(!visibleCreateLesson)}
            width={700}
        >
            <div className={styles.headerWrap}>
                Tạo buổi học
            </div>
            <InputForm
                label={'Tên buổi học'}
                placeholder={'Nhập tên buổi học'}
                required={true}
                type="name"
                value={dataLesson.name}
                error={errorDataLesson.name}
                handleChangeData={handleChangeData}
            />

            <InputUpload
                required={true}
                label="Biểu tượng"
                type="thumbnail"
                formData={dataLesson}
                error={dataLesson.thumbnail}
                handleChangeData={handleChangeData}
            />

            <div className={`input-wrap ${styles.boxPromptWrap}`}>
                <div className={"label-wrap"}>
                    Topic <span className={"required"}>*</span>
                </div>

                <Select
                    className={`main-select`}
                    style={{ width: '100%' }}
                    showSearch
                    placeholder="Chọn topic"
                    optionFilterProp="label"
                    value={dataLesson.topic_id}
                    onChange={(e) => handleChangeData('topic_id', e)}
                    options={topics ? topics.map(item => ({
                        value: item._id,
                        label: `${item.name}`,
                    })) : []}
                />

                {errorDataLesson.topic_id && errorDataLesson.topic_id.length > 0 ? <ErrorMessage message={errorDataLesson.topic_id} /> : ""}
            </div>

            <InputForm
                label={'Số lượng câu hỏi'}
                placeholder={'Nhập tên buổi học'}
                required={true}
                type="questions_to_draw"
                value={dataLesson.questions_to_draw}
                error={errorDataLesson.questions_to_draw}
                handleChangeData={handleChangeData}
            />

            <InputForm
                label={'Kinh nghiệm'}
                placeholder={'Nhập tên buổi học'}
                required={true}
                type="completion_xp"
                value={dataLesson.completion_xp}
                error={errorDataLesson.completion_xp}
                handleChangeData={handleChangeData}
            />

            <div className={styles.btnWrap}>
                <Button
                    className={styles.btnConfirm}
                    onClick={() => handleCreateLesson()}
                >Tạo buổi học
                </Button>
            </div>
        </Modal>
    )
}
