# 群眾標註
群眾標註是給公民科學社群分享影像資訊與知識的工具，產出的資料集可以提供機器學習(AI訓練)，也可以提供社群學習(新手訓練)。 凡舉生態調查、資源盤點、汙染回報、動植物辨識、病蟲害辨識、垃圾分類等，跟影像辨識相關的議題都可以利用此工具協助收集、分析資料。

## 一般功能
- **影像上傳**：提供使用者拍照上傳、檔案上傳(需登入)，以及程式API上傳(需取得API金鑰)。

- **影像標註**：依據資料集設定可使用整張標註(一張影像給一個標籤，用來訓練classification)，或是框選標註(框選出影像中的物件並給予標籤，用來練訓detection)。

- **影像驗證**：採用群眾投標的方式驗證影像標註品質，若標註人數大於設定值且認同率超過設定比例，則視為標註完成。

- **收藏資料集**：使用者可收藏經常使用的資料集，方便在後台快速尋找。

- **資料統計**：資料集會針對標註的標籤、影像時間、驗證認同率、貢獻排行榜生成統計圖，方便使用者掌握資料集狀態。若資料集有收集位置資訊，則另外會有統計地圖供使用者查看。

- **打包下載**：依據資料集標註格式不同將資料集打包成不同格式下載，若為整張標註，則依標籤將影像分在不同資料夾並壓縮成zip下載；若為框選標註，則將影像放在image資料夾，標註放在annotation資料夾(存成voc格式)，並壓縮成zip下載。

- **編輯使用者資料**：可修改使用者顯示名稱及頭像縮圖。

## 管理員功能
- **新增、刪除、編輯資料集**：可設定資集封面、影像最大解析度、是否公開、是否開放上傳影像、是否開放打包下載、是否儲存位置資訊、以及可用來標註的標籤。

- **設定、取消管理員**：一般使用者只能使用一般功能，管理員除了一般功能還能使用管理員功能。

- **設定、取消黑名單**：黑名單使用者將無法使用上傳、標註、驗證影像，與打包下載功能。

- **新增、刪除API金鑰**：API金鑰用來讓程式上傳影像，可搭配無人載具用來收集場域資料。


## 安裝架設
### 程式架構：
- 前端: vue.js + quasar.js
- 後端: nodejs + express
- 資料庫: mongodb
- 編譯工具: webpack
- 資料集打包處理: python3

### 一般安裝(ubuntu)
- [安裝nodejs](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/)
- [安裝mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
- 下載本專案程式 git clone https://github.com/aga3134/CommuTag.git
- 進入CommuTag資料夾，將config-template.json複製為config.json並修改裡面的資料(細節見下方config設定)
- 安裝node函式庫 npm install
- 安裝python函式庫 pip install -r requirements.txt
- 執行程式 node server.js
- 開啟瀏覽器網址 http://localhost:8001 即可看到網站

### 使用docker
- [安裝docker](https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04)
- [安裝docker-compose](https://linuxize.com/post/how-to-install-and-use-docker-compose-on-ubuntu-18-04/)
- 下載本專案程式 git clone https://github.com/aga3134/CommuTag.git
- 進入CommuTag資料夾，將config-template.json複製為config.json並修改裡面的資料(細節見下方config設定)
- 開啟服務 sudo docker-compose up
- 開啟瀏覽器網址 http://localhost:8001 即可看到網站

## config設定
config中含有機密資訊，請勿將其對外公開。
架設專案時請將config-template.json複製一份成config.json，並修改裡面的內容。各欄位說明如下：

- mode: 可為development或production，設為development時錯誤會有較多debug資訊，但相對速度較慢，上線使用時請設為production。

- mongodb: mongodb連線資訊
    - url: mongodb連線位置。
        - 一般安裝請設為 mongodb://localhost:27017/commutag
        - docker安裝請設為 mongodb://mongo:27017/commutag
        
- facebookAuth: 以facebook帳號登入的功能設定，要使用需先[取得facebook開發者金鑰](https://www.techcoke.com/2014/05/register-facebook-application-api-key-app-id.html)
    - enable: 若不使用facebook登入功能可設為false關閉，反之設true
    - clientID: 你申請取得的應用程式ID
    - clientSecret: 你申請取得的應用程式密鑰
    - callbackURL: 使用者登入成功後返回的網址，需設定為 {{你的伺服器網址}}/auth/facebook/callback
    
- googleAuth: 以google帳號登入的功能設定，要使用需先[取得google開發者金鑰](https://blog.gtwang.org/programming/obtaining-api-key-from-google-developers-console/)
    - enable: 若不使用google登入功能可設為false關閉，反之設true
    - clientID: 你申請取得的應用程式ID
    - clientSecret: 你申請取得的應用程式密鑰
    - callbackURL: 使用者登入成功後返回的網址，需設定為 {{你的伺服器網址}}/auth/google/callback
    
- elasticEmail: 自動寄信功能設定，本專案使用[elasticEmail服務](https://elasticemail.com/email-api)，請先申請帳號並取得API金鑰，若要串接其他email服務請修改 app/controller/emailer.js裡面的程式
    - enable: 若不使用自動寄信功能可設為false關閉，反之設true。本專案只在使用者註冊時與重設密碼時使用自動寄信功能
    - apiKey: 你申請取得的api金鑰
    - sender: 寄信時寄件人顯示的email
    - url: 寄信api網址，若使用elasticEmail api 請設為 https://api.elasticemail.com/v2/email/send
    
- session: 用來記住使用者的登入資訊
    - secret: session加密金鑰，可隨意輸入字串
    
- jwt: 重設密碼時用來驗證修改權限
    - secret: jwt加密金鑰，可隨意輸入字串
    
- hostname: 你的伺服器網址

- siteName: 顯示出來的網站名稱

- desc: 分享網站網址時顯示出來的簡介

- serverPort: 程式使用的port，若設為8001則在本機可用 http://localhost:8001 看到網站

- version: 程式版本

- defaultAdmin: 預設的管理員帳號
    - provider: 可為google、facebook、local 分別對應到gooele帳號登入、facebook帳號登入、密碼登入
    - email: 管理員帳號的email
    
- verify: 標註驗證時判斷是否驗證完成的條件設定
    - sample: 至少需有幾人驗證
    - accept: 驗證人數超過sample且認同率大於此值時視為驗證完成 (值為0~1)
    - reject: 驗證人數超過sample且認同率小於此值時視為不合格的標註，需重新標註 (值為0~1)

## API上傳

