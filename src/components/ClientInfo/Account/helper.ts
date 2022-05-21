
export const TODAY = new Date();

export const convertDateToString = (dateProgress: Date) => {
    if (dateProgress) {
      console.log("!!! convertDateToString: dateProgress => ", dateProgress);
      const dateStr = new Date(dateProgress).toISOString().replace(/GMT.*$/, "GMT+0000");
      console.log("=>>> convertDateToString: dateStr => ", dateStr);

      // const date = (new Date(dateProgress).getMonth()) + '/' + new Date(dateProgress).getDate() + '/' + new Date(dateProgress).getFullYear();
      const month = new Date(dateProgress).getMonth() < 10 ? "0" + new Date(dateProgress).getMonth() : new Date(dateProgress).getMonth()
      const day = new Date(dateProgress).getDate() < 10 ? "0" + new Date(dateProgress).getDate() : new Date(dateProgress).getDate();
      const date = month + '/' + day + '/' + new Date(dateProgress).getFullYear();


      // const time = new Date(dateProgress).getHours() + ":" + new Date(dateProgress).getMinutes() + ":" + new Date(dateProgress).getSeconds();
      const hours = new Date(dateProgress).getHours() < 10 ? "0" + new Date(dateProgress).getHours() : new Date(dateProgress).getHours();
      const minutes = new Date(dateProgress).getMinutes() < 10 ? "0" + new Date(dateProgress).getMinutes() : new Date(dateProgress).getMinutes();
      const seconds = new Date(dateProgress).getSeconds() < 10 ? "0" + new Date(dateProgress).getSeconds() : new Date(dateProgress).getSeconds();
      const time = hours + ":" + minutes + ":" + seconds;

      console.log("convertDateToString: full data (date and time) => ", `${date}, ${time}`);

      const fullDate = dateStr.replace("T", " ").replace(".", " ").split(" ");
      const dStart = fullDate[0].split("-");
      const fullTime = fullDate[1];

      return `${dStart[1]}/${dStart[2]}/${dStart[0]}, ${fullTime}`;
    }
}


export const modifyProgressDate = (stringDate: string) => {
    if(stringDate) {
      if (stringDate.includes("-")) {
        const date = stringDate.split("-");
        return date[1] + "/" + date[2] + "/" + date[0];
      }
      const date = stringDate.split(',')[0].split("/");
      const dateMonth = String(Number(date[1]) + 1).length === 2 ? "/" + String(Number(date[1]) + 1) : "/0" + String(Number(date[1]) + 1)

      return date[0] + dateMonth + "/" + date[2];
    }
    return stringDate
}
