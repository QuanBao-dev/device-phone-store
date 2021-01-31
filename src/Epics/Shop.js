import shopStore from "../Store/Shop";

export const shopStream = shopStore;

export function filterByQuery(stream, query) {
  const { dataOriginalList } = stream.currentState();
  if (query.trim() === "") {
    stream.updateData({
      dataList: dataOriginalList,
      dataTemp: dataOriginalList,
    });
  } else {
    stream.updateData({
      dataList: dataOriginalList.filter(({ tags }) =>
        tags.includes(query.trim())
      ),
      dataTemp: dataOriginalList.filter(({ tags }) =>
        tags.includes(query.trim())
      ),
    });
  }
}
