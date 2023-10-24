import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../libraries/axiosClient";
import { LOCATIONS } from "../../constants";
import { Button, Form, Popconfirm, Space, message } from "antd";

import ProductForm from "../../components/ProductForm";

const MESSAGE_TYPE = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

function ProductAdd() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [addProductForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onShowMessage = useCallback(
    (content, type = MESSAGE_TYPE.SUCCESS) => {
      messageApi.open({
        type: type,
        content: content,
      });
    },
    [messageApi]
  );

  const getSuppliers = useCallback(async () => {
    try {
      const res = await axiosClient.get("/suppliers");
      setSuppliers(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get("/categories");
      setCategories(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSuppliers();

    getCategories();
  }, [getCategories, getSuppliers]);

  const onAddProduct = useCallback(
    async (values) => {
      try {
        console.log('««««« values »»»»»', values);
        const response = await axiosClient.post("/products", values);

        addProductForm.resetFields();

        onShowMessage(response.data.message);

        navigate(LOCATIONS.PRODUCTS);
      } catch (error) {
        if (error?.response?.data?.errors) {
          error.response.data.errors.map((e) =>
            onShowMessage(e, MESSAGE_TYPE.ERROR)
          );
        }
      }
    },
    [navigate, onShowMessage, addProductForm]
  );

  return (
    <>
    {contextHolder}
    <div className="p-20">
    <h3 className="flex justify-center mb-5">Thêm sản phẩm</h3>
    <ProductForm 
        form={addProductForm}
        suppliers={suppliers}
        categories={categories}
        formName="add-product"
        onFinish={onAddProduct}
      />
    </div>
    </>
  );
}

export default ProductAdd;
