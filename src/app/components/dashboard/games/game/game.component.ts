import { ArrayDataSource } from '@angular/cdk/collections';
import { Component, OnInit, Predicate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Game } from 'src/app/models/game/game';
import { GameInvite } from 'src/app/models/game/gameInvite';
import { Users } from 'src/app/models/users/user';
import { GamesService } from 'src/app/services/gameService/games.service';
import { UsersService } from 'src/app/services/userService/users.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameId: string | null;

  game: any;

  requests: any;
  invites: any;

  userCache: Map<string, Users> = new Map<string, Users>()
  inviteForm: FormGroup;

  constructor(public auth: AuthService, private formBuilder: FormBuilder, private gameService: GamesService, private route: ActivatedRoute, public userService: UsersService) {
    this.gameId = this.route.snapshot.paramMap.get("id");
    this.inviteForm = formBuilder.group({
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.gameId == null) {
      return
    }

    this.gameService.getGame(this.gameId)
      .subscribe(data => {
        this.game = data[0];
      })

    this.gameService.getInvitesFromGame(this.gameId)
      .subscribe(data => {
        this.invites = data;
      })

    this.gameService.getGameRequestsFromGame(this.gameId)
      .subscribe(data => {
        this.requests = data;
      })

    this.userService.getUsers().subscribe(data => {
      for (const user of data) {
        this.userCache.set(user._id, user)
      }
    })
  }

  isOwner(userId: string): boolean {
    return userId == this.game.owner;
  }

  deleteParticipant(userId: string): void {
    if (this.gameId == null) {
      return
    }

    let index = this.game.participants.indexOf(userId);
    if (index < 0) {
      return;
    }

    this.game.participants.splice(index, 1);
    this.gameService.deleteParticipant(this.gameId, userId).subscribe()
  }

  acceptRequest(requester: string): void {
    if (this.gameId == null) {
      return
    }

    if (requester == this.game.owner) {
      return;
    }

    this.gameService.addParticipant(this.gameId, requester).subscribe()
    this.game.participants.push(requester)

    this.cancelRequest(requester)
  }

  cancelRequest(requester: string): void {
    if (this.gameId == null) {
      return
    }

    this.gameService.deleteGameRequestFromPlayerInGame(requester, this.gameId).subscribe()

    for (const key in this.requests) {
      const request = this.requests[key];
      if (request.requester == requester) {
        this.requests.splice(key, 1)
      }
    }
  }

  createInvite() {
    if (this.gameId == null) {
      return
    }

    let userId = this.inviteForm.get('userId')?.value;
    if (this.userCache.get(userId) == undefined) {
      // send notification that doesnt exists
      this.inviteForm.reset()
      return
    }

    if (this.existsInvite(userId)) {
      // send notification that already exists
      this.inviteForm.reset()
      return;
    }

    if (this.existsParticipant(userId)) {
      // send notification that user is already a participant
      this.inviteForm.reset()
      return;
    }

    const invite = new GameInvite(
      uuidv4(),
      this.gameId,
      this.game.host,
      userId,
      new Date()
    )

    this.gameService.createInvite(invite).subscribe();
    this.invites.push(invite);
    this.inviteForm.reset()
  }

  canceInvite(inviteId: string): void {
    for (const key in this.invites) {
      const invite = this.invites[key];
      if (invite._id == inviteId) {
        this.invites.splice(key, 1)
      }
    }

    this.gameService.deleteInvite(inviteId).subscribe();
  }

  existsInvite(userId: string): boolean {
    for (const invite of this.invites) {
      if (invite.invited == userId) {
        return true;
      }
    }
    return false;
  }

  existsParticipant(userId: string): boolean {
    for (const participant of this.game.participants) {
      if (participant == userId) {
        return true;
      }
    }
    return false;
  }

  deleteGame(): void {
    if (this.gameId == null) {
      return
    }

    this.gameService.deleteGame(this.gameId).subscribe();
    this.gameService.deleteGameRequestFromGame(this.gameId).subscribe();
    this.gameService.deleteInvite(this.gameId).subscribe();
  }

  resolveUsername(userId: string) {
    let user = this.userCache.get(userId)
    return user == undefined ? userId : user._Nombre;
  }

  getParticipants(): string[] {
    return this.game == undefined ? [] : this.game.participants
  }

  getRequests(): any[] {
    return this.requests == undefined ? [] : this.requests
  }

  getInvites(): any[] {
    return this.invites == undefined ? [] : this.invites
  }

  getName(): string {
    return this.game == undefined ? "none" : this.game.name;
  }

  getOwner(): string {
    return this.game == undefined ? "none" : this.game.owner;
  }

  getMaxPlayers(): number {
    return this.game == undefined ? 0 : this.game.maxPlayers;
  }

  getCreatedAt(): Date {
    return this.game == undefined ? new Date() : this.game.createdAt;
  }
}
