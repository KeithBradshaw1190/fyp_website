<template>
  <div class="autocomplete form-group">
    <input
      type="text"
      id="autoCompleteSearch"
      :placeholder="placeHolderText"
      v-model="keywordSearch"
      class="form-control border-input"
      :class="{
        'loading-circle': keywordSearch.length > 1,
        'hide-loading-circle':
          resultItems.length > 0 ||
          (resultItems.length == 0 && !autoCompleteProgress)
      }"
      @keyup="!autoCompleteProgress ? onKeyUp(keywordSearch) : ''"
    />
    <ul class="list-group autocomplete-results" v-if="resultItems.length > 0">
      <!-- <li
        class="list-group-item  align-items-center autocomplete-result"
        v-for="(item, i) in resultItems"
        :key="i"
        @click="
          keywordSearch = '';
          onSelected(item[itemId], item[itemText]);
        "
      >
        {{ item[itemText] }}
        <br />
        <small> {{ item[itemId] }} </small>
      </li>-->

      <li
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        v-for="(item, i) in resultItems"
        :key="i"
        @click="
          keywordSearch = '';
          onSelected(item[itemId], item[itemText], item[itemImage], item[itemDepartment] );
        "
      >
        <!-- Custom content-->
        <div class="media align-items-lg-center flex-column flex-lg-row">
          <div class="media-body order-2 order-lg-1">
            <h5 class="font-weight-bold">
              {{ item[itemText] }}
              <p class="font-weight-bold text-success my-2">€{{ item[itemId] }}</p>
            </h5>
          </div>
        </div>
        <!-- End -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "autoCompleteSearch",
  props: {
    placeHolderText: String,
    onKeyUp: Function,
    onSelected: Function,
    resultItems: Array,
    autoCompleteProgress: Boolean,
    itemText: String,
    itemId: String,
    itemImage: String,
    itemDepartment: String
  },

  data() {
    return {
      keywordSearch: ""
    };
  }
};
</script>

<style scoped>
.loading-circle {
  background-color: #ffffff;
  background-size: 16px 16px;
  background-position: right center;
  background-repeat: no-repeat;
}

.hide-loading-circle {
  background: none;
}

.form-textinput {
  padding: 8px 10px;
  border-radius: 5px;
  border: solid 1px #ccc;
}

.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 150px;
  overflow: auto;
  background-color: #fdf8f3;
  border-radius: 5px;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 10px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>
