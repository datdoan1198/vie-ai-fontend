import {Button, Input, Modal, Radio, Select, Tooltip, Upload} from "antd";
import {
    CHOICE_TYPES,
    EXERCISE_TYPES, OPTION_CHOICE_TYPES,
    OPTION_PROMPT_TYPE_1,
    OPTION_PROMPT_TYPE_2, OPTION_PROMPT_TYPE_LISTEN,
    OPTION_TYPE_EXERCISE, PROMPT_EXERCISE_LISTEN_TYPES,
    PROMPT_EXERCISE_TYPES
} from "@/utils/constants.js";
import styles from "@/pages/Home/styles.module.scss";
import InputForm from "@/components/InputForm/index.jsx";
import {InboxOutlined, PlusOutlined} from "@ant-design/icons";
import React from "react";
import InlineSVG from "react-inlinesvg";
import Question from "@/assets/images/icons/solid/circle-question.svg";
import Change from "@/assets/images/icons/solid/right-left.svg";
import {getNotification} from "@/utils/helper.js";

const { Dragger } = Upload;

export default function ModalCreateExercise(props) {
    const {
        formExercise, visibleCreateExercise, propsCreateFile, loadingCreateExercise,
        setVisibleCreateExercise, handleChangeSelect, handleChangePromptData,
        handleCreateItemAnswerTypeMatch, handleChangeCorrectAnswersTypeMatch,
        handleDeleteItemAnswerTypeMatch, handleCreateExercise,
        handleAddTextAnswerTypeFill, handleChangePromptValueQuestionTypeFill, handleChangeImageChoices,
        handleDeleteItemChooseImage, handleCreateItemChooseImage
    } = props

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            getNotification("warning", "Chỉ được tải JPG, PNG, JPEG, WEBP")
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            getNotification("warning", `Chọn tệp tối đa 2MB`)
        }
        return isJpgOrPng && isLt2M;
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleChange = (info, index) => {
        const file = info.file;

        if (file.status === 'done') {
            getBase64(info.file.originFileObj, url => {
                handleChangeImageChoices(index, {file: file.originFileObj, imageUrl: url}, 'file')
            });
        }
    };

    return (
        <Modal
            className={`general-dialog-wrap`}
            closable={false}
            footer={false}
            open={visibleCreateExercise}
            onOk={() => setVisibleCreateExercise(!visibleCreateExercise)}
            onCancel={() => setVisibleCreateExercise(!visibleCreateExercise)}
            width={900}
        >
            <div>
                <div className={`input-wrap`}>
                    <div className={"label-wrap"}>
                        Loại bài học
                        <span className={"required"}>*</span>
                    </div>

                    <Select
                        className={`main-select`}
                        style={{ width: '100%' }}
                        placeholder="Chọn loại bài học"
                        value={formExercise.type}
                        options={OPTION_TYPE_EXERCISE.map(item => ({
                            value: item.value,
                            label: `${item.label}`,
                        }))}
                        onChange={(value) => handleChangeSelect('type', value)}
                    />
                    {/*{errorFormData.form_order && errorFormData.form_order.length > 0 ? <ErrorMessage message={errorFormData.form_order} /> : ""}*/}
                </div>

                <div className={`input-wrap ${styles.boxPromptWrap}`}>
                    <div className={styles.boxLabelWrap}>
                        <div className={"label-wrap"}>
                            Câu hỏi
                            <span className={"required"}>*</span>
                        </div>

                        {
                            formExercise.type === EXERCISE_TYPES.FILL_IN_BLANK &&
                            <>
                                <Tooltip placement="top" title={<div>Nhấn nút chèn chỗ trống để lưu vị trí đáp án đúng</div>}>
                                    <InlineSVG src={Question} width={16}/>
                                </Tooltip>

                                <button
                                    onClick={() => handleAddTextAnswerTypeFill()}
                                    className={styles.btnAddAnswer}
                                >Chèn chỗ trống
                                </button>
                            </>
                        }
                    </div>

                    {
                        formExercise.type === EXERCISE_TYPES.SINGLE_CHOICE ||
                        formExercise.type === EXERCISE_TYPES.MULTIPLE_CHOICE ?
                            <div className={styles.inputType}>
                                <Select
                                    className={`main-select`}
                                    style={{ width: '100%' }}
                                    placeholder="Chọn loại"
                                    value={formExercise.prompt.type}
                                    options={OPTION_PROMPT_TYPE_1.map(item => ({
                                        value: item.value,
                                        label: `${item.label}`,
                                    }))}
                                    onChange={(value) => handleChangePromptData('type', value)}
                                />
                            </div> : ''
                    }

                    {
                        formExercise.type === EXERCISE_TYPES.MATCH &&
                        <div className={styles.inputType}>
                            <Select
                                className={`main-select`}
                                style={{ width: '100%' }}
                                placeholder="Chọn loại"
                                value={formExercise.prompt.type}
                                options={OPTION_PROMPT_TYPE_2.map(item => ({
                                    value: item.value,
                                    label: `${item.label}`,
                                }))}
                                onChange={(value) => handleChangePromptData('type', value)}
                            />
                        </div>
                    }

                    {
                        formExercise.type !== EXERCISE_TYPES.LISTEN ?
                        <>
                            {

                                formExercise.type === EXERCISE_TYPES.FILL_IN_BLANK ?
                                    <InputForm
                                        placeholder={'Nhập câu hỏi'}
                                        required={false}
                                        type="value"
                                        value={formExercise.prompt.value}
                                        handleChangeData={handleChangePromptValueQuestionTypeFill}
                                    /> :
                                    <InputForm
                                        placeholder={'Nhập câu hỏi'}
                                        required={false}
                                        type="value"
                                        value={formExercise.prompt.value}
                                        handleChangeData={handleChangePromptData}
                                    />
                            }

                        </>:
                        <Radio.Group
                            value={formExercise.prompt.type_answer}
                            onChange={(value) => handleChangePromptData('type_answer', value.target.value)}
                            className={styles.radioGroupWrap}
                            options={OPTION_PROMPT_TYPE_LISTEN.map(item => ({
                                value: item.value,
                                label: `${item.label}`,
                            }))}
                        >
                        </Radio.Group>
                    }

                    {
                        formExercise.prompt.type === PROMPT_EXERCISE_TYPES.AUDIO ||
                        formExercise.type === EXERCISE_TYPES.LISTEN ?
                            <InputForm
                                placeholder={'Nhập nội dung đoạn audio'}
                                required={false}
                                type="content_audio"
                                value={formExercise.prompt.content_audio}
                                handleChangeData={handleChangePromptData}
                            />: ''
                    }

                    {
                        formExercise.prompt.type === PROMPT_EXERCISE_TYPES.IMAGE &&
                        <Dragger {...propsCreateFile}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Vui lòng upload file ảnh</p>
                        </Dragger>
                    }
                </div>

                {
                    formExercise.prompt.type !== PROMPT_EXERCISE_TYPES.CONNECT_WORD &&
                    formExercise.prompt?.type_answer !== PROMPT_EXERCISE_LISTEN_TYPES.ENTER_INPUT ?
                    <div className={`input-wrap ${styles.boxPromptWrap}`}>
                        <div className={styles.boxLabelWrap}>
                            <div className={"label-wrap"}>
                                Các lựa chọn
                                <span className={"required"}>*</span>
                            </div>

                            <Tooltip placement="top" title={<div>Nhập đáp án và nhấn enter để lưu</div>}>
                                <InlineSVG src={Question} width={16}/>
                            </Tooltip>
                        </div>

                        {
                            formExercise.type === EXERCISE_TYPES.MULTIPLE_CHOICE ||
                            formExercise.type === EXERCISE_TYPES.SINGLE_CHOICE ?
                            <div className={styles.inputType}>
                                <Select
                                    className={`main-select`}
                                    style={{ width: '100%' }}
                                    placeholder="Chọn loại"
                                    value={formExercise.choice_type}
                                    options={OPTION_CHOICE_TYPES.map(item => ({
                                        value: item.value,
                                        label: `${item.label}`,
                                    }))}
                                    onChange={(value) => handleChangeSelect('choice_type', value)}
                                />
                            </div> : ''
                        }

                        {
                            formExercise.choice_type === CHOICE_TYPES.IMAGE ?
                                <div className={styles.multiChoicesWrap}>
                                    <div className={styles.btnWrap}>
                                        <Button
                                            onClick={() => handleCreateItemChooseImage()}
                                            className={styles.btnAddItem}
                                        >Thêm hình ảnh
                                        </Button>
                                    </div>
                                    {
                                        formExercise.choices.map((choice, index) => {
                                            return(
                                                <div key={index} className={styles.itemChoiceWrap}>
                                                    <Upload
                                                        name="avatar"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        beforeUpload={beforeUpload}
                                                        onChange={(info) => handleChange(info, index)}
                                                        customRequest={({ file, onSuccess }) => {
                                                            setTimeout(() => {
                                                                onSuccess("ok");
                                                            }, 0);
                                                        }}
                                                    >
                                                        {
                                                            choice.imageUrl ?
                                                                <img src={choice.imageUrl} alt="avatar" style={{ width: '100%' }} /> :
                                                                <button style={{ border: 0, background: 'none' }} type="button">
                                                                    <PlusOutlined />
                                                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                                                </button>
                                                        }
                                                    </Upload>

                                                    <div className={styles.inputWrap}>
                                                        <div className={"label-wrap"}>
                                                            Đáp án của hình ảnh
                                                            <span className={"required"}>*</span>
                                                        </div>
                                                        <Input
                                                            className="main-input"
                                                            size={"large"}
                                                            placeholder={'Nhập câu hỏi'}
                                                            value={choice.text}
                                                            onChange={(e) => handleChangeImageChoices(index, {text: e.target.value}, 'text')}
                                                        />
                                                    </div>

                                                    {
                                                        formExercise.choices.length > 1 &&
                                                        <Button
                                                            className={styles.btnDelete}
                                                            onClick={() => handleDeleteItemChooseImage(index)}
                                                        >Xóa
                                                        </Button>
                                                    }
                                                </div>
                                            )
                                        })
                                    }

                                </div> :
                                <div className={styles.inputType}>
                                    <Select
                                        className={`main-select`}
                                        showSearch={false}
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder={formExercise.choice_type === CHOICE_TYPES.AUDIO ? 'Nhập nội dung audio' : 'Nhập lựa chọn'}
                                        value={formExercise.choices}
                                        onChange={(value) => handleChangeSelect('choices', value)}
                                        options={[]}
                                        open={false}
                                        suffixIcon={false}
                                    />
                                </div>
                        }

                    </div> : ''
                }

                <div className={`input-wrap ${styles.boxPromptWrap}`}>
                    <div className={styles.labelGroup}>
                        <div className={styles.boxLabelWrap}>
                            <div className={"label-wrap"}>
                                Đáp án đúng
                                <span className={"required"}>*</span>
                            </div>

                            {
                                formExercise.type === EXERCISE_TYPES.LISTEN &&
                                <Tooltip placement="top" title={<div>Nhập kết quả và nhấn enter để lưu</div>}>
                                    <InlineSVG src={Question} width={16}/>
                                </Tooltip>
                            }

                            {
                                formExercise.type === EXERCISE_TYPES.FILL_IN_BLANK ||
                                (
                                    formExercise.type === EXERCISE_TYPES.MATCH &&
                                    formExercise.prompt.type === PROMPT_EXERCISE_TYPES.TEXT
                                )?
                                <Tooltip placement="top" title={<div>Chọn kết quả đúng vị trí</div>}>
                                    <InlineSVG src={Question} width={16}/>
                                </Tooltip> : ''
                            }
                        </div>

                        {
                            formExercise.prompt.type === PROMPT_EXERCISE_TYPES.CONNECT_WORD &&
                            <Button
                                className={styles.btnAddItem}
                                onClick={() => handleCreateItemAnswerTypeMatch()}
                            >Thêm
                            </Button>
                        }
                    </div>

                    {
                        formExercise.prompt.type !== PROMPT_EXERCISE_TYPES.CONNECT_WORD ?
                            <div className={styles.inputType}>
                                {
                                    formExercise.type === EXERCISE_TYPES.LISTEN &&
                                    formExercise.choices.length === 0 ?
                                        <Select
                                            className={`main-select`}
                                            showSearch={false}
                                            mode="tags"
                                            style={{ width: '100%' }}
                                            placeholder="Chọn đáp án đúng"
                                            value={formExercise.correct_answers}
                                            onChange={(value) => handleChangeSelect('correct_answers', value)}
                                            options={[]}
                                            open={false}
                                            suffixIcon={false}
                                        /> :
                                        <Select
                                            className={`main-select`}
                                            mode={
                                                formExercise.type !== EXERCISE_TYPES.SINGLE_CHOICE &&
                                                "multiple"
                                            }
                                            showSearch={false}
                                            style={{ width: '100%' }}
                                            placeholder="Chọn đáp án đúng"
                                            value={formExercise.correct_answers}
                                            onChange={(value) => handleChangeSelect('correct_answers', value)}
                                            options={formExercise.choices ?
                                                formExercise.choice_type === CHOICE_TYPES.IMAGE ?
                                                    formExercise.choices.map(item => ({
                                                        value: item.text,
                                                        label: `${item.text}`,
                                                    })) :
                                                    formExercise.choices.map(item => ({
                                                        value: item,
                                                        label: `${item}`,
                                                    }))
                                                : []
                                        }
                                        />
                                }
                            </div> :
                            <div className={styles.correctAnswersGroup}>
                                {
                                    formExercise.correct_answers.map((correct_answer, index) => {
                                        return (
                                            <div key={index} className={styles.answerWrap}>
                                                <div className={styles.mainWrap}>
                                                    <div>
                                                        <div className={"label-wrap"}>
                                                            Từ tiếng anh
                                                        </div>
                                                        <Input
                                                            className="main-input"
                                                            size={"large"}
                                                            placeholder={'Nhập kết quả'}
                                                            value={correct_answer.en}
                                                            onChange={(e) => handleChangeCorrectAnswersTypeMatch(index, 'en', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className={styles.iconWrap}>
                                                        <InlineSVG src={Change} width={14}/>
                                                    </div>
                                                    <div>
                                                        <div className={"label-wrap"}>
                                                            Từ tiếng việt
                                                        </div>
                                                        <Input
                                                            className="main-input"
                                                            size={"large"}
                                                            placeholder={'Nhập kết quả'}
                                                            value={correct_answer.vi}
                                                            onChange={(e) => handleChangeCorrectAnswersTypeMatch(index, 'vi', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                {
                                                    formExercise.correct_answers.length > 1 &&
                                                    <div className={styles.btnWrap}>
                                                        <Button
                                                            className={styles.btnDelete}
                                                            onClick={() => handleDeleteItemAnswerTypeMatch(index)}
                                                        >Xóa
                                                        </Button>
                                                    </div>
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>

            <div className={styles.btnWrap}>
                <Button
                    loading={loadingCreateExercise}
                    className={styles.btnConfirm}
                    onClick={() => handleCreateExercise()}
                >Tạo bài tập
                </Button>
            </div>
        </Modal>
    )
}
