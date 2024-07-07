const buttonArray = [];
const buttonClassName = `speak-button-${Math.random().toString(36).substr(2, 9)}`;

document.addEventListener('mouseup', function(event) {
  chrome.storage.sync.get('enabled', (data) => {
    if (!data.enabled) {
      return;
    }

    const selectedText = window.getSelection().toString().trim();
    if (selectedText !== '' && buttonArray.length === 0) {
      let button = createButton(event.pageY, event.pageX + 5);
    
      button.addEventListener('click', function() {
        const utterance = new SpeechSynthesisUtterance(selectedText);
        let lang = document.documentElement.lang || navigator.language;
        if (lang) {
          utterance.lang = lang;
        }
        utterance.onend = () => {
          setTimeout(() => {
            removeExistingButtons();
          }, 500);
        }
        window.speechSynthesis.speak(utterance);
      });
  
      document.body.appendChild(button);
      buttonArray.push(button);
  
      document.addEventListener('mousedown', (event) => {
        if (event.target !== button) {
          removeExistingButtons();
        }
      }, { once: true });
    }

  });
});

function createButton(top, left) {
  let button = document.createElement('div');
  button.className = buttonClassName;
  button.textContent = '';
  button.style.top = `${top}px`;
  button.style.left = `${left}px`;
  button.style.backgroundImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADJ6kISAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAAHWUlEQVRoBb2aT4jVVRTHZyKLAi1DkUrsrVQMp4KGURhwJ5EucmMQLhoXtWoicVEtDDfjVmkXUqsiWoiQQquiTc70X6vJimCgKCQVNGxgWrw+n5/3PH/v/eb3e+/3fpMHvnPvu/eec88599xz7/0xoyMNqd1ur0bEVrATTIBtYANYB1YB6V9wGVwC82AOnAMXR0dH/6YcmkaH4URp+TaDPWAveAw8AIKuUvkLLKaGeyjXgPvAvanNMefBGXAW/IwxbcpaVNsAlB9jhoNgP3gQ/AO+A7NgPXgOnADHwBKQ7gIasRG0wJNgB9gONOhP8AF4GyMuUK48ofgGcAT8AaQFcBxMAsNohHIfkI7304Axa4G8ylCWpGznMARXjhA4Bj4GkpPMgC29M9C2G0gne/uqfjN+C1CmsiXnmqziqdWHsGmwBE6B8TJm+vSo42bB2rJxZe3wjIMPgaQxB0DtMM/kywiyLEJp+OjdLFQqFDAsQoFDZeOq2p0DGEY3Eg5RRjarYu3ug0nr3wWt7p7qX4x3Fa4APVi6WlVS4NN5zq8cV1Qj6q0EDHrhIijEetXk9iVeiizkKletShb8JgWNcDUOVI0t9MHgUho69Sy/aYB8semnC8JrNCDHldAAV7R6YzPAGHbDmusbETLcM05sihxaHryGk9Eg6ZTyFEtnDJxppD3MyHLiGSC5l+pvxKQEvEZDJIcjy+rGAHO9yySG2ny9gpFjKJlS3Yj1YrhHGPzjIPTrXlE69JYnotTY+/m5kedGNJS+AeXLn2cqqcMfK6qut/YmPzwJtc54rZ11SubLmpG3Chi7GlG9CasE0Qe/eqqjumZ63pF4vFV6MTvNZeqn1LaSxQ2EDb0HQpGk22l+q6s6Z1a5QVbEQ5nA3B/kGpqRyz1TGoVQ0teD0tVU59V30uhjxPu8V+IfwNCEwN0we80O8o2wC3iYHcWDPmiakjqqqzpvNa7M+1LfK3DVzPDrbdNlnsw+xuxw95mSCZEXCWfaFZhI474sGT9M8+swfZUYfWktDCIExVwpI6LfUzN0nXAFTG/GVKPcD3+sgF4fKtvAFynXA/VWmuyxXvkgS81mITfWNeAb9rYRCphep4D7JuhXKuryMvDZWUa/0+G4DRrg14PrYBE0IcNxTQ0BDzP2DfAWRmQnK6Hme/hN4OZ/kfayVVBXdV5nCEmGUe0XFALk9wLo0ruBXVY3bcu+PNHmVcWE4YrLZ8gVTlbaWkAZncMqLyfxOqc6txUkDWUAfCoedx3lmOu9/hY8R9trQOpcVajHyarCrVCU+kkgTUVbvqS9ywA3Xe1DBp7wlPzeFI3nzLv5yaJOX1wWO8rSFhufantfbqxOkJZN7bR7SVTnJfeAX8yMXb/b1KGNDH4IfA0OE7/v9DmoPHw+AY+AJ8AI49sUc9Yh02fQAhW/N21CyeWuIOqqzpc1wNPRL2YqNBAh1BD5BXgqToD3aTP16eVC+NAfysY9637bEl1NZX713KBSftzNlpt/1VWdL2nAPPDrWAsMRHouefsFGN4Dm8BR8BF4qcwI+swukt9Kg8LDejzo7lS5EQ09ZYvf6jyvAbGEVXmXYUXCiC9ofR48BU4AJ34VbAZdhFF6eBfQ4xdynd5pJFc0SA+r4CXmyBsb/aHrnAacAwrdwSS1U6kTJENeQcanwHNlPeilZ2l4HDjmRzvTfGHU97Yl2p5Ko6OL4PG64XdVdT6nARfBeSDTo6AJLVYw/0bfGXAs59Vn+K1Rn4FvgUap4NPAkPoc9JIrpq7qrO4Zk7dF6XjWMMQfeL0amE49zCZ7RdBmyox4V1FToeePaXhfjLee2rL7frRHSV/cRA9Fm8IaPSnhV7nIzQvUWx3hJRXGeBh5YHkaZ4ZRVn4EoD8Ovu5Tmg4VCMtmSuasbIY/VtErRcfTVUyOA6Mxhrrel04BQ6mLaCtcPToD6IyTUusGvlozVuM9Oa8kFMKnM0mfCvwt4JUje7Dnh9M2DtRNjOX7OnU6PIykggdo8+2skZM56DHDwLgX06Dj0Y7ghhVkOnf1hy3nYJAx6OaR9ESmDKWKa5RedtOprGVQ6SWuoe7q5AqHY9XN86ScGKCHXSaVNDRiY1HNsoaGBPT+FGiVS2zWg2x1UBd1Giw8GahSweSmlFRaY/RIhmaq9edmHkPUVc+c2Z8jjUgKmlXyYXJgYAENB6b59XyErLrU21swmOJk1HrJNFtIbQ11LbA7BzDmnVeow0BpeTlhhorhZPxJhtHAKbYgsE+DstMcFNmcrkI9zy83B0ImQWQnjZkBhVy9HO8gbcpKMsNRzjXYhh1kAscg0A3s0sYkC9QNK41bO6icGAePoSKvMpQlKds5qlNlCKGsvTwI9xQ8CPYDvxJ7a/S5OAv8Yuary29M3kz/9381qG0ASmWHC4WPlj1gL/CKG68tDboGroO4Xscb1megDxXJ+7xXYq/YZ8Ht+WcPJuoiVsTM5IN8J5gA24Ah4MMmsoevKj8e+P6eB74CfUj1+wbKkGr6DwrAeygAcBmzAAAAAElFTkSuQmCC')`;
  return button;
}

function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .${buttonClassName} {
        position: absolute;
        z-index: 19999;
        background-color: rgb(76, 175, 80);
        color: white;
        border: 2px solid rgb(76, 175, 80);
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        background-size: 25px 25px;
        background-repeat: no-repeat;
        background-position: center center;
        height: 32px;
        width: 32px;
        box-shadow: 0px 2px 5px 2px #bdc1c6c7;
        box-sizing: border-box;
    }

    .${buttonClassName}:hover {
      box-shadow: 0px 2px 5px 2px #80868ba6;
      border: 2px solid #ffffffa8;;
    }

    .${buttonClassName}:focus {
      background-color: #1e8e3e;
    }
  `;
  document.head.appendChild(style);
}

function removeExistingButtons() {
  buttonArray.forEach((button) => {
    button.remove();
  });
  buttonArray.splice(0);
}
injectStyles();