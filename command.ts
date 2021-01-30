/*the Command interface*/
interface Command {
	execute: () => void;
}

/*the Invoker class*/
class Button {
	private theCommand: Command;
	// 생성자에서 버튼을 눌렀을 때 필요한 기능을 인지로 받는다.
	public constructor(theCommand: Command) {
		this.setCommand(theCommand);
	}
	public setCommand(newCommand: Command) {
		this.theCommand = newCommand;
	}
	// 버튼이 눌리면 주어진 Command의 execute 메서드를 호출한다.
	public pressed() {
		this.theCommand.execute();
	}
}

/*Receiver class*/
class Lamp {
	public turnOn() {
		console.log('Lamp On');
	}
}
/* 램프를 켜는 LampOnCommand 클래스 */
class LampOnCommand implements Command {
	private theLamp: Lamp;
	public constructor(theLamp: Lamp) {
		this.theLamp = theLamp;
	}
	// Command 인터페이스의 execute 메서드
	public execute() {
		this.theLamp.turnOn();
	}
}

/*Receiver class*/
class Alarm {
	public start() {
		console.log('Alarming');
	}
}

/* 알람을 울리는 AlarmStartCommand 클래스 */
class AlarmStartCommand implements Command {
	private theAlarm: Alarm;
	public constructor(theAlarm: Alarm) {
		this.theAlarm = theAlarm;
	}
	// Command 인터페이스의 execute 메서드
	public execute() {
		this.theAlarm.start();
	}
}

const lamp = new Lamp();
const lampOnCommand = new LampOnCommand(lamp);
const alarm = new Alarm();
const alarmStartCommand = new AlarmStartCommand(alarm);

const button1 = new Button(lampOnCommand); // 램프 켜는 Command 설정
button1.pressed(); // 램프 켜는 기능 수행

const button2 = new Button(alarmStartCommand); // 알람 울리는 Command 설정
button2.pressed(); // 알람 울리는 기능 수행
button2.setCommand(lampOnCommand); // 다시 램프 켜는 Command로 설정
button2.pressed(); // 램프 켜는 기능 수행
