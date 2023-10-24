import { useCallback, useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  message,
  Popconfirm,
  Space,
  Modal,
  Pagination,
  Input,
} from "antd";
const { Search } = Input;

//import libraries currency
import numeral from "numeral";
import "numeral/locales/vi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import axiosClient from "../../libraries/axiosClient";
import ProductForm from "../../components/ProductForm";

const MESSAGE_TYPE = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

numeral.locale("vi");

const DEFAULT_LIMIT = 8;

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: DEFAULT_LIMIT,
  });
  const [search, setSearch] = useState([]);
    // name: "",
    // categoryId: "",
    // supplierId: "",
    // priceStart: 0,
    // priceEnd: 0,


  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [refresh, setRefresh] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //import state antd
  // Sử dụng để Form.useForm(); để xử lý config biểu mẫu form sau đó sẽ truyển tất cả config qua vào form để sử dụng
  const [updateForm] = Form.useForm();
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

  const onSearch = useCallback(async (values) => {
    try {
      console.log('««««« values »»»»»', values);
      console.log('««««« products »»»»»', products);

      const keyWord = {};
      if (products.find((item) => item.name === values)) {
        keyWord.name = values;
      }
      if (products.find((item) => item.category.name === values)) {
       
        keyWord.category = values;
      }
      if (products.find((item) => item.supplier.name === values)) {
        keyWord.supplier = values;
      }
      console.log('««««« keyWord »»»»»', keyWord);

      const response = await axiosClient.get(`/products/search?name=${values}&page=${pagination.page}&pageSize=${pagination.pageSize}`);
      setSearch(response.data.payload);
      setPagination((prev) => ({
        ...prev,
        //total cần set mới để xử lý total trong pagination
        total: response.data.total,
      }));
      console.log(values);
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  }, [pagination.page, pagination.pageSize, products]);

  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      // console.log('««««« data »»»»»', data);
      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm]
  );

  const onDeleteProduct = useCallback(
    (productId) => async () => {
      try {
        const response = await axiosClient.patch(
          `products/delete/${productId}`
        );

        onShowMessage(response.data.message);

        setRefresh(!refresh);
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [onShowMessage]
  );

  const onEditFinish = useCallback(
    async (values) => {
      try {
        const response = await axiosClient.put(
          `products/${selectedProduct._id}`,
          values
        );

        updateForm.resetFields();

        setEditModalVisible(false);

        onShowMessage(response.data.message);

        const newList = products.map((item) => {
          if (item._id === selectedProduct._id) {
            // console.log('««««« item »»»»»', item);
            // console.log('««««« values »»»»»', values);
            return {
              ...item,
              ...values,
            };
          }
          return item;
        });

        setProducts(newList);
        setRefresh(!refresh);
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [onShowMessage, products, selectedProduct?._id, updateForm]
  );

  const columns = [
    {
      title: "No",
      key: "No",
      width: "1%",
      render: function (text, record, index) {
        return (
          <span>{index + 1 + pagination.pageSize * (pagination.page - 1)}</span>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: function (text, record) {
        return <Link to={`/products/${record._id}`}>{text}</Link>;
      },
    },
    {
      title: "Nhà cung cấp",
      key: "supplierName",
      render: function (text, record) {
        // console.log('««««« record »»»»»', record);
        return (
          //Check xem record.supplier có tồn tại
          <Link to={`/suppliers/${record.supplier?._id}`}>
            {record.supplier?.name}
          </Link>
        ); // record.supplier && record.supplier._id
      },
    },
    {
      title: "Tên danh mục",
      key: "categoryName",
      render: function (text, record) {
        return (
          <Link to={`/categories/${record.category?._id}`}>
            {record.category?.name}
          </Link>
        );
      },
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: function (text) {
        return <strong>{numeral(text).format("0,0$")}</strong>;
      },
    },
    {
      title: "Chiết khấu",
      dataIndex: "discount",
      key: "discount",
      render: function (text) {
        return <strong>{`${text}%`}</strong>;
      },
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      render: function (text) {
        return <strong>{numeral(text).format("0,0")}</strong>;
      },
    },
    {
      title: "Giá bán",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: function (text, record) {
        const discountedPrice = (record.price * (100 - record.discount)) / 100;
        return <strong>{numeral(discountedPrice).format("0,0$")}</strong>;
      },
    },
    {
      title: "Mô tả",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Hành động",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectProduct(record)}
            />

            <Popconfirm
              title="Bạn chắc chắn xóa"
              okText="Đồng ý"
              cancelText="Hủy"
              onConfirm={onDeleteProduct(record._id)}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //Get API Suppliers
  const getSuppliers = useCallback(async () => {
    try {
      const res = await axiosClient.get("/suppliers");
      setSuppliers(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Get API Categories
  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get("/categories");
      setCategories(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Get API Products
  const getProducts = useCallback(async () => {
    try {
      const res = await axiosClient.get(
        `/products?page=${pagination.page}&pageSize=${pagination.pageSize}`
      );
      setProducts(res.data.payload);
      setPagination((prev) => ({
        ...prev,
        //total cần set mới để xử lý total trong pagination
        total: res.data.total,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [pagination.page, pagination.pageSize]);

  const onChangePage = useCallback(
    (page, pageSize) => {
      setPagination((prev) => ({
        ...prev,
        page,
        pageSize,
      }));

      // getProducts();
    },
    [setPagination]
  );

  // const onChangePage = (page, pageSize) => {
  //   setPagination((prev) => ({
  //     ...prev,
  //     page,
  //     pageSize,
  //   }));
  // };

  useEffect(() => {
    getSuppliers();

    getCategories();
  }, [getCategories, getSuppliers]);

  useEffect(() => {
    getProducts();
  }, [getProducts, refresh]);

  useEffect(() => {
    onSearch();
  },[onSearch, refresh]);

  return (
    <>
      {contextHolder}

      <Search placeholder="Search name products" onSearch={onSearch} enterButton />
      
      <Table
        rowKey="_id"
        dataSource={search.length === 0 ? products : search}
        columns={columns}
        pagination={false}
      />

      <Pagination
        defaultCurrent={1}
        total={pagination.total}
        pageSize={DEFAULT_LIMIT}
        onChange={onChangePage}
        onShowSizeChange={onChangePage}
        current={pagination.page}
      />

      {/* Show form  */}
      <Modal
        open={editModalVisible}
        centered
        title={<span className="flex justify-center">Cập nhật thông tin</span>}
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu"
        onOk={() => {
          //Cấu hình thay thế button lưu là Submit();
          updateForm.submit();
        }}
      >
        <ProductForm
          form={updateForm}
          suppliers={suppliers}
          categories={categories}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>

    </>
  );
}

export default ProductPage;
