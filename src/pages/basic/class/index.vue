<template>
  <a-card>
    <a-form layout="horizontal">
      <a-row>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="级部"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-select placeholder="请选择">
              <a-select-option value="1">高中部</a-select-option>
              <a-select-option value="2">初中部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-form-item
            label="年级"
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 18, offset: 1 }"
          >
            <a-select placeholder="请选择">
              <a-select-option value="1">高一</a-select-option>
              <a-select-option value="2">高二</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <span style="float: right; margin-top: 3px;">
        <a-button type="primary">查询</a-button>
        <a-button style="margin-left: 8px">重置</a-button>
      </span>
    </a-form>
    <div>
      <div class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
        <a-button>批量操作</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick" slot="overlay">
            <a-menu-item key="delete">删除</a-menu-item>
            <a-menu-item key="audit">审批</a-menu-item>
          </a-menu>
          <a-button> 更多操作 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </div>
      <a-table
        rowKey="classId"
        :columns="columns"
        :dataSource="dataSource"
        :subName="'人员管理'"
        :subPath="'/basic/class/member'"
        :selectedRows="selectedRows"
        @change="onchange"
      >
        <span slot="operation" slot-scope="text, record">
          <a @click="gotoNew(record.id)">编辑</a>
          |
          <a @click="deleteItem(record.classId)">删除</a>
          |
          <a @click="gotoNew(record.classId)">人员管理</a>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
const columns = [
  {
    title: "班级序号",
    dataIndex: "classId"
  },
  {
    title: "班级",
    dataIndex: "className"
  },
  {
    title: "所属年级",
    dataIndex: "gradeId"
  },
  {
    title: "人数",
    dataIndex: "number"
  },
  {
    title: "操作",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  name: "class",
  data() {
    return {
      columns: columns,
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: []
    };
  },
  async created() {
    let { data } = await this.$api.basic.adminClass.fetchList();
    this.dataSource = data.rows;
  },
  methods: {
    onchange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    remove() {
      this.dataSource = this.dataSource.filter(
        item => this.selectedRowKeys.indexOf(item.key) < 0
      );
      this.selectedRows = this.selectedRows.filter(
        item => this.selectedRowKeys.indexOf(item.key) < 0
      );
    },
    addNew() {
      this.dataSource.unshift({
        key: 2,
        no: 2,
        name: "高三2",
        grade: "高三",
        number: 41
      });
    },
    async deleteItem(id) {
      let { data } = this.$api.basic.adminClass.deleteClass({ id });
      if (data.success) {
        this.dataSource = this.dataSource.filter(item => item.classId == id);
      }
    },
    gotoNew(id) {
      this.$router.push("/basic/class/member?id=" + id);
    },
    handleMenuClick(e) {
      if (e.key === "delete") {
        this.remove();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
