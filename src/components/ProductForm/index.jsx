import { memo } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";

import { convertOptionSelect } from "../../utils";
import styles from "./ProductForm.module.css";

const { Option } = Select;

function ProductForm({
  form,
  suppliers,
  categories,
  onFinish,
  formName,
  isHiddenSubmit,
}) {
  return (
    <Form
      form={form}
      className=""
      name={formName}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên sản phẩm"
        name="name"
        rules={[
          { required: true, message: "Vui lòng nhập tên sản phẩm" },
          { max: 50, message: "Tối đa 50 ký tự" },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        label="Nhà cung cấp"
        name="supplierId"
        rules={[
          {
            required: true,
            message: "Nhà cung cấp chưa được chọn",
          },
        ]}
      >
        {/* field selected */}
        <Select>
          {suppliers.map((item) => (
            <Option key={item._id} value={item.id || item._id}>{item.name}</Option>
          ))}
        </Select>
        {/* <Select options={convertOptionSelect(suppliers)} /> */}
      </Form.Item>

      <Form.Item
        label="Danh mục sản phẩm"
        name="categoryId"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn danh mục",
          },
        ]}
      >
        <Select options={convertOptionSelect(categories)} />
      </Form.Item>

      <Form.Item
        label="Giá gốc"
        name="price"
        rules={[
          {
            type: "number",
            min: 0,
            message: "Vui lòng nhập giá gốc là số",
          },
          { required: true, message: "Vui lòng nhập giá gốc" },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Chiết khấu (%)"
        name="discount"
        rules={[
          {
            type: "number",
            min: 0,
            max: 100,
            message: "Vui lòng nhập giảm giá là từ 0 đến 100",
          },
          { required: true, message: "Vui lòng nhập giảm giá" },
        ]}
      >
        <InputNumber className={styles.input} />
      </Form.Item>

      <Form.Item
        label="Tồn kho"
        name="stock"
        rules={[
          {
            type: "number",
            min: 0,
            message: "Vui lòng nhập tồn kho lớn hơn 0",
          },
          { required: true, message: "Vui lòng nhập tồn kho" },
        ]}
      >
        <InputNumber className={styles.input} />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input />
      </Form.Item>
      {!isHiddenSubmit && (
        <Form.Item className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default memo(ProductForm);
