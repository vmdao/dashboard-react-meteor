class ColorModel{
   
    getCorrectTextColor(hex){
			var threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
			var hRed = this.hexToR(hex);
			var hGreen = this.hexToG(hex);
			var hBlue = this.hexToB(hex);
			var cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
			  if (cBrightness > threshold){return "#000000";} else { return "#ffffff";}	
   }
		
    hexToR(h) {return parseInt((this.cutHex(h)).substring(0,2),16)}
    hexToG(h) {return parseInt((this.cutHex(h)).substring(2,4),16)}
    hexToB(h) {return parseInt((this.cutHex(h)).substring(4,6),16)}
    cutHex(h) {return (h.charAt(0) === "#") ? h.substring(1,7):h}
}

export default new ColorModel();