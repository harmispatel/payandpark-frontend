import Sidebar from "../../containers/sidebar";
import { Row, Col, Divider } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

import { Form, Select } from "antd";
import {
  Input,
  Switch,
  Modal,
  DatePicker,
  Spin,
  Space,
  Table,
  Button,
} from "antd";
const { Option } = Select;
const { Search } = Input;
const style = { background: "#ffffff", padding: "8px 0" };
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const { RangePicker } = DatePicker;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
function Campsite() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [minimumbookingdays, setMinimumbookingdays] = useState("");
  const [maximumbookingdays, setMaximumbookingdays] = useState("");
  const [bookingavailablebefore, setBookingavailablebefore] = useState("");
  const [vehicleoff, setVehicleoff] = useState("");
  const [vehicleon, setVehicleon] = useState("");
  const [adultoff, setAdultoff] = useState("");
  const [adulton, setAdulton] = useState("");
  const [childrenoff, setChildrenoff] = useState("");
  const [childrenon, setChildrenon] = useState("");
  const [peton, setPeton] = useState("");
  const [petoff, setPetoff] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [campingspot, setCampingspot] = useState([]);
  const [spotId, setSpotId] = useState(0);
  const [campingspotId, setCampingspotId] = useState("");
  const [editvisible, setEditvisible] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const showEditModal = () => {
    console.log("here");
    setEditvisible(true);
  };
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  function deleteModalShow() {
    let secondsToGo = 2;
    const modal = Modal.success({
      title: "Successfully Deleted",
      content: `The selected camping spot has been removed.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }
  const handleDelete = async (e, record) => {
    console.log(record._id);
    //handle delete
    let response = await fetch(
      `${process.env.REACT_APP_SERVER_URI}/campsites/removeCampingspot/${record._id}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      deleteModalShow();
    }
  };
  const getCampingspotDetail = async (e, record) => {
    setTitle(record.title);
    setSpotId(record.spotId);
    setCapacity(record.capacity);
    setMinimumbookingdays(record.minimumStayPeriod);
    setMaximumbookingdays(record.maximumStayPeriod);
    setBookingavailablebefore(record.bookingTimeframe);
    setVehicleon(record.price.mainSeason.vehicle);
    setVehicleoff(record.price.offSeason.vehicle);
    setAdulton(record.price.mainSeason.adult);
    setAdultoff(record.price.offSeason.adult);
    setChildrenon(record.price.mainSeason.children);
    setChildrenoff(record.price.offSeason.children);
    setPeton(record.price.mainSeason.pet);
    setPetoff(record.price.offSeason.pet);
    setIsPublic(record.isAvailable);
    setEditvisible(true);
    setCampingspotId(record._id);
  };
  const handleEdit = async (e, record) => {};
  const tableColumns = [
    { title: "SpotID", dataIndex: "spotId", key: "spotId", width: "10%" },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
    },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    {
      title: "Action",
      dataIndex: "group",
      render: (text, record) => {
        return <a onClick={(e) => getCampingspotDetail(e, record)}>edit</a>;
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <a onClick={(e) => handleDelete(e, record)}>
            <DeleteOutlined />
          </a>
        );
      },
    },
  ];

  const handleTableChange = (selectedPagination) => {
    const pager = { ...pagination };
    pager.current = selectedPagination.current;
    const page = selectedPagination.current;
    setLoading(true);
    setPagination(pager);
    // dispatch(userList(page));
  };

  async function fetchCampingspots() {
    let response = await fetch(
      `${process.env.REACT_APP_SERVER_URI}/campsites/listCampingspotsowner/61d424eec5843c3166fe7457`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let campingspot = await response.json();
    for (let i = 0; i < campingspot.length; i++) {
      campingspot[i].key = campingspot[i]._id;
    }
    setSpotId(campingspot.length + 1);
    setCampingspot(campingspot);
  }

  useEffect(() => {
    fetchCampingspots();
  }, []);

  const handleOk = async (e) => {
    setConfirmLoading(true);
    // console.log(start, end);
    let data = {
      spotId: spotId,
      title: title,
      capacity: capacity,
      bookingTimeframe: bookingavailablebefore,
      minimumStayPeriod: minimumbookingdays,
      maximumStayPeriod: maximumbookingdays,
      price: {
        mainSeason: {
          vehicle: vehicleon,
          adult: adulton,
          children: childrenon,
          pet: peton,
        },
        offSeason: {
          vehicle: vehicleoff,
          adult: adultoff,
          children: childrenoff,
          pet: petoff,
        },
      },
      isAvailable: true,
      campsite: "61d424eec5843c3166fe7457",
    };
    try {
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/campsites/createCampingspot`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async () => {
    let data = {
      title: title,
      capacity: capacity,
      bookingTimeframe: bookingavailablebefore,
      minimumStayPeriod: minimumbookingdays,
      maximumStayPeriod: maximumbookingdays,
      price: {
        mainSeason: {
          vehicle: vehicleon,
          adult: adulton,
          children: childrenon,
          pet: peton,
        },
        offSeason: {
          vehicle: vehicleoff,
          adult: adultoff,
          children: childrenoff,
          pet: petoff,
        },
      },
      isAvailable: isPublic,
      campingspotId: campingspotId,
    };
    console.log(data);
    try {
      let response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/campsites/updateCampingspot/${campingspotId}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setTimeout(() => {
          setEditvisible(false);
          setConfirmLoading(false);
        }, 1000);
      }
    } catch (error) {
      throw error;
    }
    // window.location.reload();
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleCancelupdate = () => {
    setEditvisible(false);
    window.location.reload();
  };

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <Search
              placeholder="Search"
              onSearch={(v) => {
                console.log(v);
              }}
              style={{ width: 200 }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}></div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}></div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <Button type="primary" onClick={showModal}>
              Create New
            </Button>
            <Modal
              title="Update Parking Spot"
              visible={editvisible}
              onOk={handleUpdate}
              confirmLoading={confirmLoading}
              onCancel={handleCancelupdate}
              okText="Update"
              width={800}
            >
              <h4 style={{ textAlign: "center" }}>Spot ID #{spotId}</h4>

              <Form {...layout} name="control-ref">
                <Form.Item name="categorytitleupdate" label="Category title">
                  <Input
                    defaultValue={title}
                    value={title}
                    rules={[{ required: true }]}
                    // onChange={(e) => {
                    //   setTitle(e.target.value);
                    // }}
                  />
                </Form.Item>
                <Form.Item
                  name="capacity"
                  label="Capacity"
                  rules={[{ required: true }]}
                >
                  <Input
                    defaultValue={capacity}
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="minimumbookingdays"
                  label="Minimum Booking days"
                  rules={[{ required: true }]}
                >
                  <Input
                    defaultValue={minimumbookingdays}
                    value={minimumbookingdays}
                    onChange={(e) => {
                      setMinimumbookingdays(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="maximumbookingdays"
                  label="Maximum Booking days"
                  rules={[{ required: true }]}
                >
                  <Input
                    defaultValue={maximumbookingdays}
                    value={maximumbookingdays}
                    onChange={(e) => {
                      setMaximumbookingdays(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="bookingavailablebefore"
                  label="Booking Available Before"
                  rules={[{ required: true }]}
                >
                  <Input
                    defaultValue={bookingavailablebefore}
                    value={bookingavailablebefore}
                    onChange={(e) => {
                      setBookingavailablebefore(e.target.value);
                    }}
                  />
                </Form.Item>
                <br />
                <Row>
                  <Col span={4}></Col>
                  <Col span={10}>
                    <strong>Price Main Season</strong>
                  </Col>
                  <Col span={8}>
                    <strong>Price Off Season</strong>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />
                <Row>
                  <Col span={4}></Col>
                  <Col span={3}>Vehicle</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={vehicleon}
                      value={vehicleon}
                      onChange={(e) => {
                        setVehicleon(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={4}></Col>
                  <Col span={3}>Vehicle</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={vehicleoff}
                      value={vehicleoff}
                      onChange={(e) => {
                        setVehicleoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />
                <Row>
                  <Col span={3}></Col>
                  <Col span={4}>Adult/Teenager:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={adulton}
                      value={adulton}
                      onChange={(e) => {
                        setAdulton(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={3}></Col>
                  <Col span={4}>Adult/Teenager:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={adultoff}
                      value={adultoff}
                      onChange={(e) => {
                        setAdultoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />

                <Row>
                  <Col span={4}></Col>
                  <Col span={3}>Children:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={childrenon}
                      value={childrenon}
                      onChange={(e) => {
                        setChildrenon(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={4}></Col>
                  <Col span={3}>Children:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={childrenoff}
                      value={childrenoff}
                      onChange={(e) => {
                        setChildrenoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />
                <Row>
                  <Col span={4}></Col>
                  <Col span={3}>Pet:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={peton}
                      value={peton}
                      onChange={(e) => {
                        setPeton(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={4}></Col>
                  <Col span={3}>Pet:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      defaultValue={petoff}
                      value={petoff}
                      onChange={(e) => {
                        setPetoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />
                <Row>
                  <Col span={4}></Col>
                  <Col span={3}>Visibility</Col>
                  <Col span={3}>
                    <Switch
                      checked={isPublic}
                      onChange={(checked) => {
                        setIsPublic(checked);
                      }}
                    />
                  </Col>
                  <Col span={3}></Col>
                </Row>
              </Form>
            </Modal>
            <Modal
              title="Create New Parking Spot"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              okText="Done"
              width={800}
            >
              <h4 style={{ textAlign: "center" }}>Spot ID #{spotId}</h4>

              <Form {...layout} name="control-ref">
                <Form.Item
                  name="categorytitle"
                  label="Category title"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="capacity"
                  label="Capacity"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="minimumbookingdays"
                  label="Minimum Booking days"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={minimumbookingdays}
                    onChange={(e) => {
                      setMinimumbookingdays(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="maximumbookingdays"
                  label="Maximum Booking days"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={maximumbookingdays}
                    onChange={(e) => {
                      setMaximumbookingdays(e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="bookingavailablebefore"
                  label="Booking Available Before"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={bookingavailablebefore}
                    onChange={(e) => {
                      setBookingavailablebefore(e.target.value);
                    }}
                  />
                </Form.Item>
                <br />
                <Row>
                  <Col span={4}></Col>
                  <Col span={10}>
                    <strong>Price Main Season</strong>
                  </Col>
                  <Col span={8}>
                    <strong>Price Off Season</strong>
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />
                <Row>
                  <Col span={4}></Col>
                  <Col span={3}>Vehicle</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={vehicleon}
                      onChange={(e) => {
                        setVehicleon(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={4}></Col>
                  <Col span={3}>Vehicle</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={vehicleoff}
                      onChange={(e) => {
                        setVehicleoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />
                <Row>
                  <Col span={3}></Col>
                  <Col span={4}>Adult/Teenager:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={adulton}
                      onChange={(e) => {
                        setAdulton(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={3}></Col>
                  <Col span={4}>Adult/Teenager:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={adultoff}
                      onChange={(e) => {
                        setAdultoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />

                <Row>
                  <Col span={4}></Col>
                  <Col span={3}>Children:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={childrenon}
                      onChange={(e) => {
                        setChildrenon(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={4}></Col>
                  <Col span={3}>Children:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={childrenoff}
                      onChange={(e) => {
                        setChildrenoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
                <br />
                <Row>
                  <Col span={4}></Col>
                  <Col span={3}>Pet:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={peton}
                      onChange={(e) => {
                        setPeton(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={4}></Col>
                  <Col span={3}>Pet:</Col>
                  <Col span={3}>
                    <Input
                      placeholder=""
                      value={petoff}
                      onChange={(e) => {
                        setPetoff(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Form>
            </Modal>
          </div>
        </Col>
      </Row>

      <Spin spinning={loading}>
        <Table
          rowSelection={rowSelection}
          columns={tableColumns}
          loading={loading}
          dataSource={campingspot}
          onChange={handleTableChange}
        />
      </Spin>
    </>
  );
}
export default Campsite;
