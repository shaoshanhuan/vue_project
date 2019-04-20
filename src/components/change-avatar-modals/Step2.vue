<template>
    <div>
        <h6>正在上传，请稍后</h6>
        <Progress :percent="percent" status="active" hide-info/>
    </div>
</template>

<script>
export default {
    props : ['file','changeStep','changePicname','changePicRealWH'],
    data() {
        return {
            percent: 0
        }
    },
    created(){
        // 创建虚拟表单
        var form = new FormData();
        // 追加文件
        form.append('file', this.file);
        // Ajax的语法 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var obj = JSON.parse(xhr.responseText)
                if(obj.result == -2){
                    self.$Message.warning('文件尺寸过大，请重新选择图片上传');
                    self.changeStep(1);
                }else if(obj.result == -3){
                    self.$Message.warning('文件类型不正确，请重新选择图片上传');
                    self.changeStep(1);
                }else if(obj.result == -4){
                    self.$Message.warning('文件宽度和高度不符合要求范围');
                    self.changeStep(1);
                }else if(obj.result == 1){
                    // 改变picname
                    self.changePicname(obj.filename);
                    // 改变宽度和高度
                    self.changePicRealWH(obj.width,obj.height);
                    self.changeStep(3);
                }
            }
        }
        // 上传进度
        var self = this;
        xhr.upload.onprogress = function(e){
            self.percent = e.loaded / e.total * 100;
        }
        xhr.open('POST','/api/uploadavatar',true);
        xhr.send(form);
    }
}
</script>

<style lang="less" scoped>

</style>