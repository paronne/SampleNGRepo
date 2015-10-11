/**
 * @properties={typeid:24,uuid:"5679EBB9-2C94-448D-AB9B-F251C79A8515"}
 */
function addNewRecord(){
	foundset.newRecord(false);
	foundset.setSelectedIndex(foundset.getSize());
}

/**
 * @properties={typeid:24,uuid:"C2CF4B1D-12F1-4F3C-AD61-31AF27FBB862"}
 */
function deleteSelectedRecord() {
	foundset.deleteRecord();
}